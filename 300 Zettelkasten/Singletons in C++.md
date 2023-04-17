#programming #cpp #design-pattern

## Example

```cpp
class Singleton {
 public:
  inline static Singleton& GetInstance() {
    static Singleton instance;
    return static_cast<Shell&>(*instance);
  }

  Singleton(const Singleton&) = delete;
  void operator =(const Singleton&) = delete;
  
 private:
  Singleton() = default;
};
```

```cpp
class IInProgress {
 virtual IInProgress Name() = 0;
 virtual IInProgress InternalFuctions() = 0;
 virtual IComplete Complete() = 0;
};
```

```cpp
class IComplete {

};
```

```cpp
class ShellBuilder : public IInProgress, IComplete {
 public:
  ShellBuilder() {}

  IInProgress Name();
  IInProgress InternalFuctions();
  IComplete Complete();

 private:
};
```

```cpp

let shell = ShellBuilder()
	.Name("jupiter")
	.InternalFunction(.......)
	.Complete

```

## How does it work

We delegate the external construction of the class to the `GetInstance()` function.
This way we ensure that there's only one instance of the `Singleton` class.

```cpp
public:
  inline static Singleton& GetInstance() {
    static Singleton* instance;
    return static_cast<Shell&>(*instance);
  }
```

For this to be enforced is also required to **delete** the `Copy` constructor and the `Move` operator. 
```cpp
Singleton(const Singleton&) = delete;
void operator =(const Singleton&) = delete;
```

Additionaly the `default constructor` has to be hidden from external access.
```cpp
private:
  Shell() = default;
```
