# -*- coding: utf-8 -*-
# @Time    : 2024/12/1 21:05
# @Author  : 顾安
# @File    : 4.jsonpath语法练习.py


from jsonpath import jsonpath

info = {
    "store": {
        "book": [
            {"category": "reference",
             "author": "Nigel Rees",
             "title": "Sayings of the Century",
             "price": 8.95
             },
            {"category": "fiction",
             "author": "Evelyn Waugh",
             "title": "Sword of Honour",
             "price": 12.99
             },
            {"category": "fiction",
             "author": "Herman Melville",
             "title": "Moby Dick",
             "isbn": "0-553-21311-3",
             "price": 8.99
             },
            {"category": "fiction",
             "author": "J. R. R. Tolkien",
             "title": "The Lord of the Rings",
             "isbn": "0-395-19395-8",
             "price": 22.99
             }
        ],
        "bicycle": {
            # "title": "双双牌自行车",
            "color": "red",
            "price": 19.95
        }
    }
}


# 1.提取第一本书的名称
res = jsonpath(info, '$.store.book[0].title')
print(res)
# 如果需要使用中括号获取子节点那么外层必须是双引号, 如果找不到则不会报错(返回的是一个false)
res = jsonpath(info, "$['store']['book'][0]['title']")
print(res)


# 2.提取2、3、4本书的名称
res = jsonpath(info, '$.store.book[1,2,3].title')
print(res)
res = jsonpath(info, '$..book[1:].title')
print(res)
res = jsonpath(info, '$..book[1:4].title')
print(res)


# 3.提取第一本书和第三本书的书名
res = jsonpath(info, '$.store.book[0,2].title')
print(res)
res = jsonpath(info, '$..book[::2].title')
print(res)

# 4.提取最后一本书的书名
# 根据列表长度-1获取列表中的最后一个元素的下标
res = jsonpath(info, '$..book[(@.length-1)].title')
print(res)
res = jsonpath(info, '$..book[-1:].title')
print(res)


# 5. 提取价格小于10的书籍名称
res = jsonpath(info, '$..book[?(@.price < 10)].title')
print(res)


# 6. 提取价格价格小于等于20的书籍商品价格
res = jsonpath(info, '$..book[?(@.price <= 20)].title')
print(res)
res = jsonpath(info, '$..*[?(@.price <= 20)].title')
print(res)

# 7. 提取所有作者名称
res = jsonpath(info, '$..author')
print(res)
res = jsonpath(info, '$.store.book[::].author')
print(res)
res = jsonpath(info, '$.store.book[*].author')
print(res)
# res = jsonpath(info, '$..book.author')  # 如果value是一个列表则无法直接获取列表中的元素(字典)的value
# print(res)
res = jsonpath(info, '$..book..author')  # 不建议用
print(res)


# 8.获取商店中的所有商品
res = jsonpath(info, '$.store')
print(res)

# 9.获取商店中的所有商品的价格
res = jsonpath(info, '$..price')
print(res)
res = jsonpath(info, '$.store..price')
print(res)


# 10. 获取带有编号的书籍
res = jsonpath(info, '$..book[?(@.isbn)].title')
print(res)


# 11.获取不带编号的书籍
# !: 逻辑取反
res = jsonpath(info, '$..book[?(!@.isbn)].title')
print(res)


# 12. 获取价格在5 - 10之间的书籍
res = jsonpath(info, '$..book[?(@.price >=5 && @.price <=10)].title')
print(res)

# 13. 获取价格不再5 - 10之间的书籍
res = jsonpath(info, '$..book[?(@.price < 5 || @.price > 10)].title')
print(res)

# 14.获取自行车的颜色
res = jsonpath(info, '$..color')
print(res)


# 15. 获取所有数据
print(jsonpath(info, '$.*'))





















