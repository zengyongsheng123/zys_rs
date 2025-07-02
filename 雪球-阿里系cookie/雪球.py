import requests


headers = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Language": "zh",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Referer": "https://xueqiu.com/today",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "same-origin",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
# cookies = {
#     # "ssxmod_itna": "eqmxgDBDnAdQwxBPxB4DK3otDyBDcAlgB02=D6=Gjx0y0HeGzDAPxnbwcmP2vcvN6/g7wx4FzOxrRx5T80OLmMnDB3DEx0=58KD0IYD44GTDt4DTD34DYDixib8xi5GRD0KDF7dy/1yDYPDE05DRhPDuPYhDGa1jOFhDeKD0rqFDQK+XOxDBOxAFA0H+ZPhDieFPF5Iug0EqQDkD75+Dlc598xkWzkUFjyEXKLG67KDX1QDv1ywRhoPXc5z4th46iG4rWPd4hR3KAGPtlp9eGiYsZa4Vj2otDq4OLZDkX29DDcDFWs7qYD==",
#     # "ssxmod_itna2": "eqmxgDBDnAdQwxBPxB4DK3otDyBDcAlgB02=D6=GDnKLxxDst5DLCD7uZ54HQr=D6Dnhp73e4Whw7AeSAIqPu/WubWICQ7PkTea5e1SGxa5KPHQCCetB36wjqFPtx1xqTfoWl1oWZ6Ejd3V7qoZYBflI8Ly74ALBiKAUbm7SM34CDhdL4odq4h8tmolD8dEUeo1nLNA8=jlloQP5i00YSrr1l5uY6E60dicebvK+o7rdhBG7qUM7pouAwEGwUE04ajwe+SsbfLjob0945lWPsnx//Q5F5AgK13/tlwIz33OUfNtj5/0thx8R/zpDo7W/GrK+A44LIbiW01iaEC01l9C7AI9FAevqXe4BT+SRCGvR3pCRaQQqfI4q50ewhCjaHUwk4y/Yu93TbBpQVPb0uLzYtKGt3qfbBSGAAi2044=fhkY+Q0wtFuYaIyWn0DbjQ0l7T7WGrKrWuyNGe4XHIjGQiiKaeNW3xYGQ6D7Kx4mxt4957cS/Dl4CHbAiBDLImGuuSROaM4sC9SDfyBuLz5/nqZ+4GdFHmusOIumFv15uWIQ3ik/af2wy8lQd1038BR9dw+P7xDKd+5zGr6AOR9lt=gmQBYBkEAeXFCDoe0oz7F2fqtyomO1PgKkfKoCd30qQ218HW1NfsBqD7=DYIPeD",
#     # "acw_tc": "2760827917354534071804773eb002b810d640a7459d0c5b1e5eebaf4b2f20"
# }
url = "https://xueqiu.com/today"
params = {
    "md5__1038": "n4IxgD070=G=D=YDsTiQd4AIHIe2Y=ba4D"
}
response = requests.get(url, headers=headers,  params=params)

print(response.text)
print(response)