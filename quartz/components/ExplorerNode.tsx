// @ts-ignore
import { QuartzPluginData } from "../plugins/vfile"
import {
  joinSegments,
  resolveRelative,
  clone,
  simplifySlug,
  SimpleSlug,
  FilePath,
} from "../util/path"

type OrderEntries = "sort" | "filter" | "map"

export interface Options {
  title?: string
  folderDefaultState: "collapsed" | "open"
  folderClickBehavior: "collapse" | "link"
  useSavedState: boolean
  sortFn: (a: FileNode, b: FileNode) => number
  filterFn: (node: FileNode) => boolean
  mapFn: (node: FileNode) => void
  order: OrderEntries[]
}

type DataWrapper = {
  file: QuartzPluginData
  path: string[]
}

export type FolderState = {
  path: string
  collapsed: boolean
}

function getPathSegment(fp: FilePath | undefined, idx: number): string | undefined {
  if (!fp) {
    return undefined
  }

  return fp.split("/").at(idx)
}

// Structure to add all files into a tree
export class FileNode {
  children: Array<FileNode>
  name: string // this is the slug segment
  displayName: string
  file: QuartzPluginData | null
  depth: number

  constructor(slugSegment: string, displayName?: string, file?: QuartzPluginData, depth?: number) {
    this.children = []
    this.name = slugSegment
    this.displayName = displayName ?? file?.frontmatter?.title ?? slugSegment
    this.file = file ? clone(file) : null
    this.depth = depth ?? 0
  }

  private insert(fileData: DataWrapper) {
    if (fileData.path.length === 0) {
      return
    }

    const nextSegment = fileData.path[0]

    // base case, insert here
    if (fileData.path.length === 1) {
      if (nextSegment === "") {
        // index case (we are the root and we just found index.md), set our data appropriately
        const title = fileData.file.frontmatter?.title
        if (title && title !== "index") {
          this.displayName = title
        }
      } else {
        // direct child
        this.children.push(new FileNode(nextSegment, undefined, fileData.file, this.depth + 1))
      }

      return
    }

    // find the right child to insert into
    fileData.path = fileData.path.splice(1)
    const child = this.children.find((c) => c.name === nextSegment)
    if (child) {
      child.insert(fileData)
      return
    }

    const newChild = new FileNode(
      nextSegment,
      getPathSegment(fileData.file.relativePath, this.depth),
      undefined,
      this.depth + 1,
    )
    newChild.insert(fileData)
    this.children.push(newChild)
  }

  // Add new file to tree
  add(file: QuartzPluginData) {
    this.insert({ file: file, path: simplifySlug(file.slug!).split("/") })
  }

  /**
   * Filter FileNode tree. Behaves similar to `Array.prototype.filter()`, but modifies tree in place
   * @param filterFn function to filter tree with
   */
  filter(filterFn: (node: FileNode) => boolean) {
    this.children = this.children.filter(filterFn)
    this.children.forEach((child) => child.filter(filterFn))
  }

  /**
   * Filter FileNode tree. Behaves similar to `Array.prototype.map()`, but modifies tree in place
   * @param mapFn function to use for mapping over tree
   */
  map(mapFn: (node: FileNode) => void) {
    mapFn(this)
    this.children.forEach((child) => child.map(mapFn))
  }

  /**
   * Get folder representation with state of tree.
   * Intended to only be called on root node before changes to the tree are made
   * @param collapsed default state of folders (collapsed by default or not)
   * @returns array containing folder state for tree
   */
  getFolderPaths(collapsed: boolean): FolderState[] {
    const folderPaths: FolderState[] = []

    const traverse = (node: FileNode, currentPath: string) => {
      if (!node.file) {
        const folderPath = joinSegments(currentPath, node.name)
        if (folderPath !== "") {
          folderPaths.push({ path: folderPath, collapsed })
        }

        node.children.forEach((child) => traverse(child, folderPath))
      }
    }

    traverse(this, "")
    return folderPaths
  }

  // Sort order: folders first, then files. Sort folders and files alphabetically
  /**
   * Sorts tree according to sort/compare function
   * @param sortFn compare function used for `.sort()`, also used recursively for children
   */
  sort(sortFn: (a: FileNode, b: FileNode) => number) {
    this.children = this.children.sort(sortFn)
    this.children.forEach((e) => e.sort(sortFn))
  }
}

type ExplorerNodeProps = {
  node: FileNode
  opts: Options
  fileData: QuartzPluginData
  fullPath?: string
}

export function ExplorerNode({ node, opts, fullPath, fileData }: ExplorerNodeProps) {
  // Get options
  const folderBehavior = opts.folderClickBehavior
  const isDefaultOpen = opts.folderDefaultState === "open"

  // Calculate current folderPath
  const folderPath = node.name !== "" ? joinSegments(fullPath ?? "", node.name) : ""
  const href = resolveRelative(fileData.slug!, folderPath as SimpleSlug) + "/"

  return (
    <>
      {node.file ? (
        // Single file node
        <li key={node.file.slug}>
          <a href={resolveRelative(fileData.slug!, node.file.slug!)} data-for={node.file.slug}>
            {node.displayName}
          </a>
        </li>
      ) : (
        <li>
          {node.name !== "" && (
            // Node with entire folder
            // Render svg button + folder name, then children
            <div class="folder-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="folder-icon icon icon-tabler icon-tabler-folder"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                stroke-width="3"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="folder-icon closed icon icon-tabler icon-tabler-folder-filled"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="none"
                fill="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M9 3a1 1 0 0 1 .608 .206l.1 .087l2.706 2.707h6.586a3 3 0 0 1 2.995 2.824l.005 .176v8a3 3 0 0 1 -2.824 2.995l-.176 .005h-14a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-11a3 3 0 0 1 2.824 -2.995l.176 -.005h4z"
                  stroke-width="0"
                  fill="currentColor"
                />
              </svg>
              {/* render <a> tag if folderBehavior is "link", otherwise render <button> with collapse click event */}
              <div key={node.name} data-folderpath={folderPath}>
                {folderBehavior === "link" ? (
                  <a href={href} data-for={node.name} class="folder-title">
                    {node.displayName}
                  </a>
                ) : (
                  <button class="folder-button">
                    <span class="folder-title">{node.displayName}</span>
                  </button>
                )}
              </div>
            </div>
          )}
          {/* Recursively render children of folder */}
          <div class={`folder-outer ${node.depth === 0 || isDefaultOpen ? "open" : ""}`}>
            <ul
              // Inline style for left folder paddings
              style={{
                paddingLeft: node.name !== "" ? "1.4rem" : "0",
              }}
              class="content"
              data-folderul={folderPath}
            >
              {node.children.map((childNode) =>
                // eagerly render children so we can memoize properly
                ExplorerNode({ node: childNode, opts, fileData, fullPath: folderPath }),
              )}
            </ul>
          </div>
        </li>
      )}
    </>
  )
}
