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
