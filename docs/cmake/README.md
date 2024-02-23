---
sidebarDepth: 2
sidebar: auto
---

# cmake tutorials note

[dabing cmake](https://www.bilibili.com/video/BV14s4y1g7Zj), [doc-1](https://subingwen.cn/cmake/CMake-primer/), [doc-2](https://subingwen.cn/cmake/CMake-advanced)

## 快速上手

**gcc 步骤**:

1. 预处理
2. 编译（编译器）
3. 汇编（汇编器）
4. 链接（链接器）

如果有很多文件（比如超过 10 个）需要在一起编译，那么使用 gcc 命令似乎很棘手，通常我们会使用 makefile 或 cmake 工具辅助编译。

步骤：

1. create file `CmakeLists.txt`
2. execute cmd `cmake <path>` to generate `Makefile`（2nd path can be relative path of `CMakeLists.txt`）
3. use cmd `make` to obtain executable file

### cmake 安装与基本使用

```sh
sudo apt install cmake

cmake --version
```

```sh
# centos
# https://stackoverflow.com/questions/55345373/how-to-install-gcc-g-8-on-centos#comment136335547_66016318
sudo dnf groupinstall "Development Tools"
```

create file `CMakeLists.txt` and fill with:

```python
# 定义最小的 cmake 版本，可选
cmake_minimum_required(VERSION 3.15)

# 定义项目名
project(helloworld)

# 指定最终可执行文件以及源文件
# 参数1：可执行文件名子
# 参数2：原文件列表，如果有多个可使用 space 或 ; 间隔
add_executable(app main.cpp add.cpp sub.cpp mul.cpp div.cpp)
# 注意：指定源文件时无需指定 .h 文件
```

利用 cmake 进行编译

```txt
$ cmake .
.
├── add.cpp
├── CMakeCache.txt
├── CMakeFiles
├── cmake_install.cmake
├── CMakeLists.txt
├── div.cpp
├── head.h
├── main.cpp
├── Makefile
├── mul.cpp
└── sub.cpp
```

---

**推荐**另一种方式：将所有 cmake 和 make 中间产物统一放在一个目录下

> 尝试这种方式之间需要删掉上边一步产生的所有中间产物
>
> `rm -rf CMakeFiles cmake_install.cmake CMakeCache.txt Makefile`

1. 创建 `build` 目录并 `cd` 进入它
2. 执行命令 `cmake ..`
3. 然后所有的编译中间产物都出现在了 build 目录中

```txt
.
├── add.cpp
├── build
├── CMakeLists.txt
├── div.cpp
├── head.h
├── main.cpp
├── mul.cpp
└── sub.cpp
```

4. 然后执行 `make` 命令，然后可以得到 `app` 可执行文件

### cmake - 添加变量

```python
cmake_minimum_required(VERSION 3.15)
project(helloworld)

# 1.指定标准版本(auto keyword is supported in std11+)
set(CMAKE_CXX_STANDARD 11)

# 2. 定义变量
set(SRC_LIST main.cpp add.cpp sub.cpp mul.cpp div.cpp)
# same as
# set(SRC_LIST main.cpp;add.cpp;sub.cpp;mul.cpp;div.cpp)
add_executable(app ${SRC_LIST})
```

第三种方式：通过为 cmake 命令添加参数添加

```sh
cmake <path> -DCMAKE_CXX_STANDARD=11
```

---

另一个宏 `EXECUTABLE_OUTPUT_PATH` 用来指定生成的可执行文件的路径。如果路径不存在会自动被创建

```python
...

SET(HOME /home/eugene/tools)
set(EXECUTABLE_OUTPUT_PATH ${HOME}/bin)
```

---

```python
cmake_minimum_required(VERSION 3.15)
project(helloworld)

# 定义标准库版本
set(CMAKE_CXX_STANDARD 11)

set(SRC_LIST main.cpp add.cpp sub.cpp mul.cpp div.cpp)
# set(SRC_LIST main.cpp;add.cpp;sub.cpp;mul.cpp;div.cpp)
add_executable(app ${SRC_LIST})

set(HOME /home/eugene)
set(EXECUTABLE_OUTPUT_PATH ${HOME}/aa/bb/app)
```

```txt
➜  build cmake .. && make
-- The C compiler identification is GNU 11.4.0
-- The CXX compiler identification is GNU 11.4.0
-- Detecting C compiler ABI info
-- Detecting C compiler ABI info - done
-- Check for working C compiler: /usr/bin/cc - skipped
-- Detecting C compile features
-- Detecting C compile features - done
-- Detecting CXX compiler ABI info
-- Detecting CXX compiler ABI info - done
-- Check for working CXX compiler: /usr/bin/c++ - skipped
-- Detecting CXX compile features
-- Detecting CXX compile features - done
-- Configuring done
-- Generating done
-- Build files have been written to: /home/eugene/Documents/cmake_workspace/01proj_helloworld/build
[ 16%] Building CXX object CMakeFiles/app.dir/main.cpp.o
[ 33%] Building CXX object CMakeFiles/app.dir/add.cpp.o
[ 50%] Building CXX object CMakeFiles/app.dir/sub.cpp.o
[ 66%] Building CXX object CMakeFiles/app.dir/mul.cpp.o
[ 83%] Building CXX object CMakeFiles/app.dir/div.cpp.o
[100%] Linking CXX executable /home/eugene/aa/bb/app/app
[100%] Built target app
➜  build cmake .. && make
-- The C compiler identification is GNU 11.4.0
-- The CXX compiler identification is GNU 11.4.0
-- Detecting C compiler ABI info
-- Detecting C compiler ABI info - done
-- Check for working C compiler: /usr/bin/cc - skipped
-- Detecting C compile features
-- Detecting C compile features - done
-- Detecting CXX compiler ABI info
-- Detecting CXX compiler ABI info - done
-- Check for working CXX compiler: /usr/bin/c++ - skipped
-- Detecting CXX compile features
-- Detecting CXX compile features - done
-- Configuring done
-- Generating done
-- Build files have been written to: /home/eugene/Documents/cmake_workspace/01proj_helloworld/build
[ 16%] Building CXX object CMakeFiles/app.dir/main.cpp.o
[ 33%] Building CXX object CMakeFiles/app.dir/add.cpp.o
[ 50%] Building CXX object CMakeFiles/app.dir/sub.cpp.o
[ 66%] Building CXX object CMakeFiles/app.dir/mul.cpp.o
[ 83%] Building CXX object CMakeFiles/app.dir/div.cpp.o
[100%] Linking CXX executable /home/eugene/aa/bb/app/app
[100%] Built target app
➜  build /home/eugene/aa/bb/app/app
a = 20, b = 12
a + b = 32
a - b = 8
a * b = 240
a / b = 1.666667
➜  build
➜  build
```

动手尝试：change CMAKE_CXX_STANDARD value from 11 to 98, and see what'll happen.

### cmake - 搜索文件

上一节中我们使用 set 命令指定了所有的源文件，但当文件很多时这种方法太繁琐，我们可以使用搜索命令自动扫描某个目录下的文件

方式一：`aux_source_directory` 命令

```python
cmake_minimum_required(VERSION 3.15)
project(helloworld)

set(CMAKE_CXX_STANDARD 11)

# set(SRC_LIST main.cpp add.cpp sub.cpp mul.cpp div.cpp)

# 搜索指定目录下的所有文件并将其赋值给一个变量
aux_source_directory(${PROJECT_SOURCE_DIR} SRC_LIST)

# 使用变量
add_executable(app ${SRC_LIST})
```

> `PROJECT_SOURCE_DIR` 这个变量所指的目录是我们使用 cmake 命令时传递的第一个参数所指的目录

方式二：`file` 命令，功能比较强大

```python
cmake_minimum_required(VERSION 3.15)
project(helloworld)

set(CMAKE_CXX_STANDARD 11)

# set(SRC_LIST main.cpp add.cpp sub.cpp mul.cpp div.cpp)

# 根据 ${PROJECT_SOURCE_DIR}/*.cpp 规则搜索所有文件(无递归)并将他们保存在变量 SRC_LIST 中
file(GLOB SRC_LIST ${PROJECT_SOURCE_DIR}/*.cpp)

add_executable(app ${SRC_LIST})
```

[file — CMake 3.29.0-rc1 Documentation](https://cmake.org/cmake/help/latest/command/file.html)

### 指定头文件目录

创建两个目录：`include` 用来存放所有头文件；`src` 用来存放所有源文件

结构为

```txt
➜  01proj_helloworld tree -L 2
.
├── build
│   ├── app
│   ├── CMakeCache.txt
│   ├── CMakeFiles
│   ├── cmake_install.cmake
│   └── Makefile
├── CMakeLists.txt
├── include
│   └── head.h
└── src
    ├── add.cpp
    ├── div.cpp
    ├── main.cpp
    ├── mul.cpp
    └── sub.cpp
```

编写 `CMakeLists.txt`

```python
cmake_minimum_required(VERSION 3.15)
project(helloworld)

set(CMAKE_CXX_STANDARD 11)

# file(GLOB SRC_LIST ${PROJECT_SOURCE_DIR}/*.cpp)
file(GLOB SRC_LIST ${PROJECT_SOURCE_DIR}/src/*.cpp)

add_executable(app ${SRC_LIST})
```

在 build 目录中进行编译，发现出错了

```txt
➜  build cmake .. && make
-- The C compiler identification is GNU 11.4.0
-- The CXX compiler identification is GNU 11.4.0
-- Detecting C compiler ABI info
-- Detecting C compiler ABI info - done
-- Check for working C compiler: /usr/bin/cc - skipped
-- Detecting C compile features
-- Detecting C compile features - done
-- Detecting CXX compiler ABI info
-- Detecting CXX compiler ABI info - done
-- Check for working CXX compiler: /usr/bin/c++ - skipped
-- Detecting CXX compile features
-- Detecting CXX compile features - done
-- Configuring done
-- Generating done
-- Build files have been written to: /home/eugene/Documents/cmake_workspace/01proj_helloworld/build
[ 16%] Building CXX object CMakeFiles/app.dir/src/add.cpp.o
/home/eugene/Documents/cmake_workspace/01proj_helloworld/src/add.cpp:2:10: fatal error: head.h: No such file or directory
    2 | #include "head.h"
      |          ^~~~~~~~
compilation terminated.
make[2]: *** [CMakeFiles/app.dir/build.make:76: CMakeFiles/app.dir/src/add.cpp.o] Error 1
make[1]: *** [CMakeFiles/Makefile2:83: CMakeFiles/app.dir/all] Error 2
make: *** [Makefile:91: all] Error 2
➜  build
```

原因：`add.cpp` 找不到头文件

解决方法

1. 修改 `add.cpp` 的 `#include "head.h"`为 `#include "../include/head.h"`: 如果文件太多，那么修改起来很麻烦
2. （推荐） 指定 header 目录，使用命令： `include_directories(${PROJECT_SOURCE_DIR}/include)`

最终的 `CMakeLists.txt`

```python
cmake_minimum_required(VERSION 3.15)
project(helloworld)

set(CMAKE_CXX_STANDARD 11)

file(GLOB SRC_LIST ${PROJECT_SOURCE_DIR}/src/*.cpp)

# 指定头文件所在目录
include_directories(${PROJECT_SOURCE_DIR}/include)

add_executable(app ${SRC_LIST})
```

## 基于 cmake 构建库和使用库

项目：`02project_lib`

创建项目有哪些目的？

1. 构建可执行文件
2. 组合源文件到一个二进制文件，也称为库，有动态库和静态库之分

### 创建动态库

```python
cmake_minimum_required(VERSION 3.15)
project(mylib)

set(CMAKE_CXX_STANDARD 11)

file(GLOB SRC_LIST ${PROJECT_SOURCE_DIR}/src/*.cpp)

include_directories(${PROJECT_SOURCE_DIR}/include)

# add_executable(app ${SRC_LIST})

# 使用 add_library 命令
add_library(mycalc SHARED ${SRC_LIST})
```

```txt
$ tree -L 2
.
├── build
│   ├── CMakeCache.txt
│   ├── CMakeFiles
│   ├── cmake_install.cmake
│   ├── libmycalc.so          # 动态库
│   └── Makefile
├── CMakeLists.txt
├── include
│   └── head.h
└── src
    ├── add.cpp
    ├── div.cpp
    ├── mul.cpp
    └── sub.cpp
```

> dynamic library have executable permission while static library do not have!

### 创建静态库

利用上一节代码，只需改动一个关键字

`CMakeLists.txt`:

```python
#add_library(mycalc SHARED ${SRC_LIST})
add_library(mycalc STATIC ${SRC_LIST})
```

```txt
.
├── build
│   ├── CMakeCache.txt
│   ├── CMakeFiles
│   ├── cmake_install.cmake
│   ├── libmycalc.a         # 静态库
│   └── Makefile
├── CMakeLists.txt
├── include
│   └── head.h
└── src
    ├── add.cpp
    ├── div.cpp
    ├── mul.cpp
    └── sub.cpp
```

---

可以使用宏 `LIBRARY_OUTPUT_PATH` 指定动态库或静态库的输出目录

```python
cmake_minimum_required(VERSION 3.15)
project(mylib)

set(CMAKE_CXX_STANDARD 11)

file(GLOB SRC_LIST ${PROJECT_SOURCE_DIR}/src/*.cpp)

include_directories(${PROJECT_SOURCE_DIR}/include)

# set library output path
set(LIBRARY_OUTPUT_PATH ${PROJECT_SOURCE_DIR}/lib)

add_library(mycalc STATIC ${SRC_LIST})
```

### 链接静态库

准备目录（项目： `03proj_use_static_lib`）

```txt
.
├── build
├── CMakeLists.txt
├── include
│   └── head.h
├── lib
│   └── libmycalc.a
└── src
    └── main.cpp
```

链接静态库

```python
project(helloworld)
set(CMAKE_CXX_STANDARD 11)

file(GLOB SRC_LIST ${PROJECT_SOURCE_DIR}/src/*.cpp)
include_directories(${PROJECT_SOURCE_DIR}/include)


# way 1
# link_libraries(${PROJECT_SOURCE_DIR}/lib/libmycalc.a) # specify a staic lib path
# way 2
# link_libraries(libmycalc.a)
# link_directories(${PROJECT_SOURCE_DIR}/lib) # specify lib directories
# way 3
# link_libraries(mycalc)
# link_directories(${PROJECT_SOURCE_DIR}/lib) # specify lib directories
# way 4
file(GLOB LIB_LIST ${PROJECT_SOURCE_DIR}/lib/*.a)
link_libraries(${LIB_LIST}) # support multiple staic lib paths

add_executable(app ${SRC_LIST})
```

注意

- `link_libraries()` and `link_directories()` 命令支持多个参数
- `link_libraries()` 只能链接静态库
- `link_directories()` 指定要链接库所在的目录

### 链接动态库

除了在项目中引入静态库，很多时候也会使用一些标准的或者第三方提供的一些动态库，关于**动态库的制作、使用以及在内存中的加载方式**和静态库都是不同的。

在 cmake 中链接动态库需要用到 [target_link_libraries](https://cmake.org/cmake/help/latest/command/target_link_libraries.html) 命令

```txt
target_link_libraries(<target>
                      <PRIVATE|PUBLIC|INTERFACE> <item>...
                     [<PRIVATE|PUBLIC|INTERFACE> <item>...]...)
```

- `target` 表示要链接到哪里，即目标。可以是可执行文件或者一个库
- 后续的参数格式为 `修饰符 动态库`，不同的修饰符表示不同的权限
  - 如果链接的动态库之间没有依赖关系，则无需做任何设置，**一般无需指定**，使用**默认的 PUBLIC** 即可
  - 动态库的链接具有`传递性`，例如动态库 A 链接了动态库 B 和动态库 C（可表示为 `target_link_libraries(a, b, c)`），动态库 D 链接了动态库 A，那么此时动态库 D 相当于也链接了动态库 B、C，并可以使用 B 和 C 中定义的方法
  - 权限 `PUBLIC`：用 public 修饰的库会被链接到 target 中，并且其中的符号也会被导出提供给第三方使用
  - 权限 `PRIVATE`：用 private 修饰的库仅被链接到 target 中，并且终结掉，第三方无法感知调用了什么库
  - 权限 `INTERFACE`：用 interface 修饰的库不会被连接到前面的 taget 中，只会导出符号
- `target_link_libraries` 即可用来链接静态库，也可用来链接动态库

例子：链接之前创建的动态库 `mycalc`

```python
cmake_minimum_required(VERSION 3.15)
project(helloworld)
set(CMAKE_CXX_STANDARD 11)

file(GLOB SRC_LIST ${PROJECT_SOURCE_DIR}/src/*.cpp)
include_directories(${PROJECT_SOURCE_DIR}/include)

# 链接动态库所在目录（需要放在add_executable命令前）
link_directories(${PROJECT_SOURCE_DIR}/lib)

add_executable(app ${SRC_LIST})

# 链接动态库到可执行文件
target_link_libraries(app mycalc)
```

注意：`target_link_libraries()` 语句必须放在**最后一行**

### 补充：库的加载工作

> 引用 [Linux 静态库和动态库 | 爱编程的大丙 (subingwen.cn)](https://subingwen.cn/linux/library/#1-1-生成静态链接库)

**静态库如何被加载**

在程序编译的最后一个阶段也就是链接阶段，提供的**静态库会被打包到可执行程序中**。当可执行程序被执行，静态库中的代码也会一并被加载到内存中，因此不会出现静态库找不到无法被加载的问题。

优点：

- 静态库被打包到应用程序中加载速度快
- 发布程序无需提供静态库，移植方便

缺点：

- 相同的库文件数据可能在内存中被加载多份, 消耗系统资源，浪费内存
- 库文件更新需要重新编译项目文件, 生成新的可执行程序, 浪费时间。

---

**动态库如何被加载**

在程序编译的最后一个阶段也就是**链接阶段**：

- 在 gcc 命令中虽然指定了库路径（使用参数 -L），但是这个路径并没有记录到可执行程序中，**只是检查**了这个路径下的库文件是否存在。
- 同样对应的动态库文件也**没有被打包**到可执行程序中，**只是在可执行程序中记录了库的名字**。

可执行程序被执行起来之后:

- 程序执行的时候会先检测需要的动态库是否可以被加载，加载不到就会提示上边的错误信息
- 当动态库中的函数在程序中**被调用了,** 这个时候动态库**才加载到内存**，如果不被调用就不加载
- 动态库的检测和内存加载操作都是由动态连接器来完成的

优点：

- 可实现不同进程间的资源**共享**
- 动态库升级简单, 只需要替换库文件, 无需重新编译应用程序
- 程序猿可以控制何时加载动态库, 不调用库函数动态库不会被加载

缺点：

- 加载速度比静态库慢, 以现在计算机的性能可以忽略

- 发布程序需要提供依赖的动态库

## 日志

可以利用 [message](https://cmake.org/cmake/help/latest/command/message.html) 命令记录日志

```python
message([STATUS|WARNING|AUTHOR_WARNING|SEND_ERROR|FATAL_ERROR] "message here...")
```

- 不添加模式：表示重要信息
- `STATUS`：表示非重要信息
- `WARNING`：警告，会继续执行
- `AUTHOR_WARNING`：警告（dev），会继续执行
- `SEND_ERROR`：错误，继续执行，跳过生成
- `FATAL_ERROR`：致命错误，终止运行和生成

例子

```python
file(GLOB SRC_LIST ${PROJECT_SOURCE_DIR}/src/*.cpp)

# -- source files:/home/.../04proj_use_dynamic_lib/src/main.cpp
message(STATUS "source files:" ${SRC_LIST})
```

## 变量和列表

### 字符串拼接

使用 set 命令进行字符串拼接

```python
set(STR1 "NeuralNetwork")
set(STR2 "Hareware")
set(STR3 "I love " ${STR1} " and " ${STR2})
message(STATUS ${STR3})
# -- I love NeuralNetwork and Hareware

set(STR4 "I love ${STR1} and ${STR2}")
message(STATUS ${STR4})
# -- I love NeuralNetwork and Hareware
```

### List 操作

[list](https://cmake.org/cmake/help/latest/command/list.html)

基本操作：

```
list([APPEND|LENGTH|GET|REMOVE_ITEM] 操作的变量 参数 [结果变量])
```

```python
# 创建 list
set(A_LIST apple banana grape)
message(${A_LIST}) # applebananagrape

# 向 list 中追加元素
list(APPEND A_LIST "cake")
message(${A_LIST}) # applebananagrapecake

# 获取长度
list(LENGTH A_LIST LIST_LEN)
message("len: ${LIST_LEN}")  # 4

# 获取 A_LIST[0]
list(GET A_LIST 0 LIST_STR)
message("A_LIST[0]: ${LIST_STR}") # apple
# A_LIST[3]
list(GET A_LIST 3 LIST_STR)
message("A_LIST[3]: ${LIST_STR}") # cake

# 移除元素
list(REMOVE_ITEM A_LIST grape)
# A_LIST[2]
list(GET A_LIST 2 LIST_STR)
message("A_LIST[2]: ${LIST_STR}") # cake
```

其他操作：在指定位置插入若干元素、将元素插入 i=0 的位置、删除第一个元素、移除最后一个元素、移除指定索引的元素、移除指定元素、移除重复元素、翻转元素、元素排序等等

## 宏定义

代码所在项目：`05_micro_definition`

在代码中，我们会根据宏定义判断是否执行某一段逻辑，比如

```c
#include<stdio.h>
void process() {
  printf("process...\n");
}

int main() {
//有宏定义时才会执行代码
#ifdef DEBUG_MODE
  printf("debugging...\n");
#endif
  for (int i=0; i<10; i++) {
    process();
  }
  return 0;
}
```

为了让测试更灵活，我们可以不在代码中定义宏，而是在 gcc/g++ 命令中指定，比如

```sh
$ gcc test.c -DDEBUG_MODE -o app
```

在 CMake 中我们不直接配置 gcc/g++，而是在 `CMakeLists.txt` 中进行宏定义

```py
add_definitions(-DDEBUG_MODE)
```

测试：

```py
cmake_minimum_required(VERSION 3.15)

project(helloworld)

# 进行宏定义
add_definitions(-DDEBUG_MODE)

add_executable(app main.cpp)
```

## CMake 嵌套

当项目功能比较复杂时，需要进行“模块化”拆分简化，每个模块中包含一个 `CMakeLists.txt`

比如我们有这样一个“复杂”的项目

```txt
.
|-- calc                   <--- 计算工具模块
|   |-- add.cpp
|   |-- CMakeLists.txt
|   |-- div.cpp
|   |-- mul.cpp
|   `-- sub.cpp
|-- CMakeLists.txt
|-- include                <---- 声明模块
|   |-- calc.h
|   `-- sort.h
|-- sort                   <---- 排序模块
|   |-- CMakeLists.txt
|   |-- insert_sort.cpp
|   `-- select_sort.cpp
|-- test_calc              <---- 测试模块，测试计算工具
|   |-- CMakeLists.txt
|   `-- test_calc.cpp
`-- test_sort              <---- 测试模块，测试排序工具
    |-- CMakeLists.txt
    `-- test_sort.cpp
```

**变量共享**：子节点使用父节点中定义的变量

指定父子关系：使用 `add_subdirectory` 命令

### 编写根 CMakeLists.txt

```py
cmake_minimum_required(VERSION 3.15)
project(test)

# 定义变量
# 1.定义静态库生成路径
SET(SLIB_PATH ${PROJECT_SOURCE_DIR}/lib)
# 2.定义可执行程序的存储路径
SET(EXE_PATH ${PROJECT_SOURCE_DIR}/bin)
# 3.定义头文件路径
SET(HEAD_PATH ${PROJECT_SOURCE_DIR}/include)
# 4.定义库文件名
SET(LIB_CALC calc)
SET(LIB_SORT sort)
# 5.定义可执行文件名
SET(APP_TEST_CALC app_test_calc)
SET(APP_TEST_SORT app_test_sort)

# 添加子目录
add_subdirectory(calc)
add_subdirectory(sort)
add_subdirectory(test_calc)
add_subdirectory(test_sort)
```

在此定义的变量可以在子模块中使用

### calc 和 sort 两个模块的 CMakeLists.txt

`calc/CMakeLists.txt`

```py
cmake_minimum_required(VERSION 3.15)
project(calc)

# 搜索所有源文件
file(GLOB SRC_LIST ./*.cpp)
# 指定头文件
include_directories(${HEAD_PATH})
# 指定库输出目录
set(LIBRARY_OUTPUT_PATH ${SLIB_PATH})
# 编译静态库。指定库名
add_library(${LIB_CALC} STATIC ${SRC_LIST})
```

`sort/CMakeLists.txt`

```py
cmake_minimum_required(VERSION 3.15)
project(sort)

# 搜索所有源文件
file(GLOB SRC_LIST ./*.cpp)
# 指定头文件
include_directories(${HEAD_PATH})
# 指定库输出目录
set(LIBRARY_OUTPUT_PATH ${SLIB_PATH})
# 编译静态库。指定库名
add_library(${LIB_SORT} STATIC ${SRC_LIST})
```

### 两个测试目录里的 CMakeLists.txt

`test_calc/CMakeLists.txt`

```py
cmake_minimum_required(VERSION 3.15)
project(test_calc)

# 搜索源文件
file(GLOB SRC_LIST ./*.cpp)
# 包含声明文件目录
include_directories(${HEAD_PATH})

# 链接静态库
link_libraries(${LIB_CALC})
# 指定库目录
link_directories(${SLIB_PATH})

# 指定生成程序存储位置
SET(EXECUTABLE_OUTPUT_PATH ${EXE_PATH})
# 生成程序
add_executable(${APP_TEST_CALC} ${SRC_LIST})
```

`test_sort/CMakeLists.txt`

```py
cmake_minimum_required(VERSION 3.15)
project(test_sort)

# 搜索源文件
file(GLOB SRC_LIST ./*.cpp)
# 包含声明文件目录
include_directories(${HEAD_PATH})

# 链接静态库
link_libraries(${LIB_SORT})
# 指定库目录
link_directories(${SLIB_PATH})

# 指定生成程序存储位置
SET(EXECUTABLE_OUTPUT_PATH ${EXE_PATH})
# 生成程序
add_executable(${APP_TEST_SORT} ${SRC_LIST})
```

### 执行构建

在根目录中创建 build 目录，然后在其中执行 `cmake ..`，然后执行 `make` 命令

```
[engure@ali build]$ cmake .. && make
-- The C compiler identification is GNU 8.5.0
-- The CXX compiler identification is GNU 8.5.0
-- Detecting C compiler ABI info
-- Detecting C compiler ABI info - done
-- Check for working C compiler: /usr/bin/cc - skipped
-- Detecting C compile features
-- Detecting C compile features - done
-- Detecting CXX compiler ABI info
-- Detecting CXX compiler ABI info - done
-- Check for working CXX compiler: /usr/bin/c++ - skipped
-- Detecting CXX compile features
-- Detecting CXX compile features - done
-- Configuring done
-- Generating done
-- Build files have been written to: /home/engure/cmake_dabing/cmake-tutorials-dabing/06_modulization/build
[  8%] Building CXX object calc/CMakeFiles/calc.dir/add.cpp.o
[ 16%] Building CXX object calc/CMakeFiles/calc.dir/div.cpp.o
[ 25%] Building CXX object calc/CMakeFiles/calc.dir/mul.cpp.o
[ 33%] Building CXX object calc/CMakeFiles/calc.dir/sub.cpp.o
[ 41%] Linking CXX static library ../../lib/libcalc.a
[ 41%] Built target calc
[ 50%] Building CXX object sort/CMakeFiles/sort.dir/insert_sort.cpp.o
[ 58%] Building CXX object sort/CMakeFiles/sort.dir/select_sort.cpp.o
[ 66%] Linking CXX static library ../../lib/libsort.a
[ 66%] Built target sort
[ 75%] Building CXX object test_calc/CMakeFiles/app_test_calc.dir/test_calc.cpp.o
[ 83%] Linking CXX executable ../../bin/app_test_calc
[ 83%] Built target app_test_calc
[ 91%] Building CXX object test_sort/CMakeFiles/app_test_sort.dir/test_sort.cpp.o
[100%] Linking CXX executable ../../bin/app_test_sort
[100%] Built target app_test_sort
```

### 在 sort 库中链接 calc 库

在 sort 静态库中链接 calc 静态库，只需要保留 `test_sort` 一个测试模块即可

项目：`07_modulization_lib_link`

1、指定 sort 库链接 calc 库，`sort/CMakeLists.txt`

```py
cmake_minimum_required(VERSION 3.15)
project(sort)

file(GLOB SRC_LIST ./*.cpp)
include_directories(${HEAD_PATH})
set(LIBRARY_OUTPUT_PATH ${SLIB_PATH})

# 链接 calc 库
link_directories(${SLIB_PATH})
link_libraries(${LIB_CALC})

add_library(${LIB_SORT} STATIC ${SRC_LIST})
```

2、在 sort 库中使用 calc 库中的的函数，`sort/insert_sort.cpp`

```cpp
#include<stdio.h>
#include "sort.h"
//引入声明
#include "calc.h"

void insert_sort(int *arr, int size) {
  // 调用 add 方法
  int c = add(100, 200);
  printf("---\nc=%d\n---\n", c);
  int i, j, key;
  for (i = 1; i < size; i++) {
      key = arr[i];
      j = i - 1;
      while (j >= 0 && arr[j] > key) {
          arr[j + 1] = arr[j];
          j = j - 1;
      }
      arr[j + 1] = key;
  }
}
```

3、一点说明 `test_sort/CMakeLists.txt`

```py
cmake_minimum_required(VERSION 3.15)
project(test_sort)

file(GLOB SRC_LIST ./*.cpp)
include_directories(${HEAD_PATH})

# 链接 sort 库以使用其中的排序函数
#   因为 sort 库链接了 calc 库（可理解为 calc 打包到了 sort 库中）
#   所以相当于该测试模块也链接了 calc 库，可直接使用 calc 库
link_libraries(${LIB_SORT})
link_directories(${SLIB_PATH})

SET(EXECUTABLE_OUTPUT_PATH ${EXE_PATH})
add_executable(${APP_TEST_SORT} ${SRC_LIST})
```

4、在 `test_sort` 测试项目中使用 calc 库，`test_sort/test_sort.cpp`

```cpp
#include<stdio.h>
#include "sort.h"
#include "calc.h"

int main() {
  int arr1[] = {5, 2, 8, 12, 1};
  int arr2[] = {5, 2, 8, 12, 1};

  int size = 5;
  insert_sort(arr1, size);
  select_sort(arr2,  size);

  for (int i = 0; i < size; i++) {
      printf("%d ", arr1[i]);
  }
  printf("\n");
  for (int i = 0; i < size; i++) {
      printf("%d ", arr2[i]);
  }
  printf("\n");

  // 使用 calc 库中的函数
  printf("10 + 20 = %d\n", add(10, 20));

  return 0;
}
```

5、在 build 目录中构建，测试

### 在静态库中链接动态库

拷贝上一节最终的项目代码，命名为 `08_modulization_lib_link_2`

1、指定 calc 项目最终生成动态库 `calc/CMakeLists.txt`

```py
cmake_minimum_required(VERSION 3.15)
project(calc)

file(GLOB SRC_LIST ./*.cpp)
include_directories(${HEAD_PATH})
set(LIBRARY_OUTPUT_PATH ${SLIB_PATH})
# 将 STATIC 修改为 SHARED
add_library(${LIB_CALC} SHARED ${SRC_LIST})
```

2、在 sort 中链接 calc 动态库 `sort/CMakeLists.txt`

```py
cmake_minimum_required(VERSION 3.15)
project(sort)

file(GLOB SRC_LIST ./*.cpp)
include_directories(${HEAD_PATH})
set(LIBRARY_OUTPUT_PATH ${SLIB_PATH})

link_directories(${SLIB_PATH})

# 生成静态库 sort
add_library(${LIB_SORT} STATIC ${SRC_LIST})

# 链接动态库 calc 到 sort 静态库
target_link_libraries(${LIB_SORT} ${LIB_CALC})
```

3、构建项目

> 此时 calc 库并未被打包到 sort 库中，而是保存了符号

## 项目

内容：使用 cmake 重新构建一个 [ReactorHttp-Cpp（大丙老师另一个教程）](https://github.com/YY0628/ReactorHttp-cpp) 项目

步骤：

1. 按照不同功能将文件分组，编写根 cmake 配置文件和子配置文件
2. 子模块有 common、http、reactor、tcp、thread，在构建时都作为静态库单独构建
3. …

此章很重要，值得多看 [p19](https://www.bilibili.com/video/BV14s4y1g7Zj?p=19)

checkpoint: [cmake-tutorials-dabing: cmake 课程大丙老师 - Gitee.com](https://gitee.com/egu0/cmake-tutorials-dabing/tree/56765f240ffb0daf38fe653beccee6915c9960c7/)
