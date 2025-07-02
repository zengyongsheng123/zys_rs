import requests

from xhs_tools import *

x_b3_traceid = generate_trace_id()
x_xray_traceid = generate_xray_trace_id()
x_t = str(int(time.time()) * 1000)
a1 = generate_a1()
headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
    "cache-control": "no-cache",
    "content-type": "application/json;charset=UTF-8",
    "origin": "https://www.xiaohongshu.com",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://www.xiaohongshu.com/",
    "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Microsoft Edge\";v=\"134\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0",
    "x-b3-traceid": x_b3_traceid,
    "x-mns": "unload",
    # "x-s": "XYW_eyJzaWduU3ZuIjoiNTYiLCJzaWduVHlwZSI6IngyIiwiYXBwSWQiOiJ4aHMtcGMtd2ViIiwic2lnblZlcnNpb24iOiIxIiwicGF5bG9hZCI6IjMxYjAxODQ0NGUzZDk3N2NhOThiY2E5YzViNjAzNzg3MDAxYzNkYjFiNmM0ZmY2MTU5YzU5OWNjZGNmZmVkYWIxNDNkMDY4YTBjMGVlYTQ3MTgzMWZmMmE0MmRhYTU1NDg1ZGRiYTU0MTE3YjQ0N2FhYmMyMTE1MDg1M2M0ODdmNjVkOGU1OWJjNzczMjIxNDAyMzI5MGI4YWNjZTIwMTVkN2Q1YWMxOWQ4MzA2ZDVmN2FlMzcxZGU1NWY2NGY5ODVjYTVhZjEyZDQ3Y2Y4ZDNjODEyYTllZjZhMjRlNzA1ZGExZTIwMWE3YTlhMGZjM2NhYzhjMTZhYjdkNzA4Y2QyODRmMjcwMjVjZmMzODE5NDQzMWM2NmVkOGQxN2M3MmY5YTQ3NDQ2MGIwNDY5NDRkMGMwOTZhMzE0ZWQ4NDEwOTdmNjBkYWRiNzFlNGViODNhZWUyNmJjZjc3ZDhkODU4OGFkMTJhMjhmZDE2MjI4NWU3NTQxOGJkMTBlZWQ5OTVmYmI0YTQ1N2YwNjdlNDM4Y2VjYzQ1MmMxOGJmNTliIn0=",
    "x-s-common": "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",
    "x-t": x_t,
    "x-xray-traceid": x_xray_traceid
}
cookies = {
    "abRequestId": "56b7bd05-63e8-5c9a-82ec-a68077aef06c",
    "webBuild": "4.62.3",
    "a1": a1,
    "webId": "5d2cbdd8bcdc270cacec320e89ce8617",
    "acw_tc": "0a0bb41417472074555263477e0614266eac382ac834d34eed048507c47032",
    "web_session": "030037af1711540663d46c035c2f4af89ebbc6",
    "gid": "yjKSf0d4Wd7iyjKSf0SD0Af78WTU31WjY6vJCqfjvVyJh028UWTExC88822244J8djKKjfij",
    "xsecappid": "xhs-pc-web",
    "loadts": "1747207973700",
    "websectiga": "10f9a40ba454a07755a08f27ef8194c53637eba4551cf9751c009d9afb564467",
    "sec_poison_id": "19ced68a-504c-4c69-b9ed-bc3eb936ada6",
    "unread": "{%22ub%22:%2267ff1b66000000001b03f41e%22%2C%22ue%22:%2268031850000000001d018254%22%2C%22uc%22:19}"
}
url = "https://edith.xiaohongshu.com/api/sns/web/v1/homefeed"
data = {
    "cursor_score": "1.7472080669220057E9",
    "num": 39,
    "refresh_type": 3,
    "note_index": 113,
    "unread_begin_note_id": "",
    "unread_end_note_id": "",
    "unread_note_count": 0,
    "category": "homefeed_recommend",
    "search_key": "",
    "need_num": 14,
    "image_formats": [
        "jpg",
        "webp",
        "avif"
    ],
    "need_filter_image": False
}
data = json.dumps(data, separators=(',', ':'))
x_s = generate_X_s("url=/api/sns/web/v1/homefeed" + data, cookies['a1'], x_t)
headers["x-s"] = x_s
headers["x-s-common"] = generate_xs_common(cookies['a1'], x_t, x_s,
                                           "I38rHdgsjopgIvesdVwgIC+oIELmBZ5e3VwXLgFTIxS3bqwErFeexd0ekncAzMFYnqthIhJeDfMDKutRI3KsYorWHPtGrbV0P9WfIi/eWc6eYqtyQApPI37ekmR6QL+5Ii6sdneeSfqYHqwl2qt5B0DBIx+PGDi/sVtkIxdsxuwr4qtiIhuaIE3e3LV0I3VTIC7e0utl2ADmsLveDSKsSPw5IEvsiVtJOqw8BuwfPpdeTFWOIx4TIiu6ZPwrPut5IvlaLbgs3qtxIxes1VwHIkumIkIyejgsY/WTge7eSqte/D7sDcpipedeYrDtIC6eDVw2IENsSqtlnlSuNjVtIx5e1qt3bmAeVn8LIES/IhEe+AFDI3EPKI8BIiW7ZPwAIvGj4sesYINsxVwSIC7s0n5e0fE8Ii3e6WrS8qwUIE7s1f0s6WAeiVtwpjgeYVwuIvRGc/vefqwELBJsWVw8IxI2I38isqwZgVtPzg8QwcNejd/eiqwoIhAsS/AskFRYIk/s0MvskdE0IhgsiVwDIhGdQqwJ8ut9I33e3PtVIiNsVVwxIENsdVtMtqwnePwUIvGAIxDL29uf2IoexutIIhPGIiveSqw4BYErLj7sYj4VIicwqqtQZqwIIvdekqtu+DNeTldsVFlwIh/sxdos3PtGpuwaIvge0uwXIieeTeFwIvgeDfKeDqtFIx6sxuwU4eQtIED+Iv7sxINsxAgs0c7sdPwiIvHWIvIFcPwZICIRIhgsVL4lNjJsfqttIhpwBqtEGWJsjMdeWuwprVwZIxkAIiqynPwtqPtNIv5sSM5siPt+sVwBICEoZqt5I3FmZIZyIi3sjnAsfngs1PtJyVtPIicGIx6sxqtCIEOeSFDEIxIZaMFQIxi/IxdskPtRouwPqPtvIvIDIE7sTA/eVqwCJSZ6IvINJVtbnqwJIvmFICi8IkSDIh3ekSesibzlNutPI3S3ruttcqtlIiOs6ASuIEkje9KsDutDZPtKBYLsP7i0IkY1zVwyIhJe6LTmIiznrPwfIiE2wVtjzuwaIiT7IxufI3qJ/PtdIEmbIide6qwl/zY6IhuyIC/s0M7skuwFIvM9IEu0mLMDIC4kLZqlIC6s0MeeDut/IiveVPwwIk+tI3KeYPtrIxDa/VtiI37s6SGpgVtIwVtLIv7eTVt+Ih6sWMTkIhJe0leeiPwww0/sduw2spdsVVt4I37e6LNsxPwaIibuIEqqaVttypLcIv5eYVtBo0KeiY81ruthI3T8Ii/sYmSpICds0uwwICZZIE7eDLz0IEu+IkMcPlHnI3esfLY9IkD9Iv+XI3KeSAcZQVtz/PtmeI7e3b6s0Pt3ICoejLOs3PtwaPt8IxYraPtxnuwbwPt3+VtTJVwWKB/e6z7eifKskzOe1qw4IhuPIiHxICFkIC5s1mJsi9VhwPt8IhIqgPwwG9geTqtrI36e0pAefelZICdedPtr8IDTI3OsfqtWIvNsTVwAHPt/I36sSn+82PwLZ//s0dIXIiOeWPwQaVwEBeNeiuw1rutZgutZI3EOIhcEbDosdm6s1PtVIxde1PwJrqw8yovsiruSgnR5tpc6wuw2nqwGICLCIvVaIvFMyZNsxsIJICQcICpLBPwOI3mYJuwQIkJe6ZIfoVt6Ihr4eVw1Ix7sxcqwIhDTIxgeYutwquwogL3sWBNedPwBGPwJIvWrGqwcIEveDW6sTg0s1Pt2I3Q5IidskdVeICKsDVtKIx+pI36eSuwoGpF1eqthzPteIvh=")
response = requests.post(url, headers=headers, cookies=cookies, data=data)
print(response.text)
with open("result.json", "w") as f:
    f.write(json.dumps(response.json()))
