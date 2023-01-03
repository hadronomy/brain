```cpp
class Singleton {
 public:
  inline static Singleton& GetInstance() {
    static Singleton* instance;
    return static_cast<Shell&>(*instance);
  }

  Singleton(const Singleton&) = delete;
  void operator =(const Singleton&) = delete;
  
 private:
  Shell() = default;
};
```

## Delegate construction

We delegate the external construction of the class to the `GetInstance()` function.
This way we ensure that there's only one instance of the `Singleton` class.

For this to be enforced is also required to delete