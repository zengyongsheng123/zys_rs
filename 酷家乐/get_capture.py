import requests


headers = {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Language": "zh,zh-CN;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Origin": "https://www.kujiale.com",
    "Pragma": "no-cache",
    "Referer": "https://www.kujiale.com/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "cross-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
    "sec-ch-ua": "\"Chromium\";v=\"136\", \"Google Chrome\";v=\"136\", \"Not.A/Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
url = "https://sphinx.tongdun.net/sphinx/validatecode/v1"
params = {
    "p1": "b37uCyfyme4S7TF/MVDRqSRxP4CB2BjsnDxr4bSxz0vSL/~hXNGID9Tr7vzaBm~F^^kujia-1748435215546-f8a732397acfd^^kujia^^kujia_web",
    "p2": "pWPHM1748435216SF0MtNKneEb^^3^^1^^1"
}
data = {
    "p3": "4MCQVB2hW8ehRakEGlkPrZ6fM3OZnC2iRH8TnPQs8dcOJTP1avANUMUjRLsF1rwloep2qtenZX9TWaO0MGWqa3NmKK7pJiQrws7cLE/5~LB6tb0yVXjV2OxBwVc4alxKVboxN7Mia12tGXWApK4vORO13EHYzXGwpuZWr32DSfWkE6xDNbaeFCYOUyObtgipy3IWmx6ermBwBAmklnUd3PqDwtzToiUwjUGIEJqVR~QwoKZabtHLbZn7Iw333XYLxoZ4sP6B7n14MUSFpqSCd9B5lX9U/7FUjqMMpRfwYnHlIxWs/xceqiRd5EUBMHxy1Q/T5M~eG9F6fsHu0E~hT/4JxMU04KXkQEKZCUP5IK9/Z9F0eN3/rJH9JNzs6jm2kaaxkB79ggX0PJp3W4883iMyCLczMDqFi83zlOXlOj5cPxOtJMWTGX5BprzDxGt5OhD1BVZcvG5Uj~WnPyvpOO5vQmjP6h93O0pPK6nH8/h5sWyIIrFbb5oAjzYWpsoCt~WdxtHLzYn0gxXLRL85yXIJo2NZ33k1n6Lxs8x28kFjW~AGKumEAqsTxWNQLQ2SZWwepkrYKU~8BqpsS69BNIxUl0VN5mkXxV9UJHFx4Kk/tsfNWWL2ZsdQD2Fzr9ufpi6Q6tdonGIX~FQiBztGaSA9E3hnU6/NRGcqvFTe9bLPxH5bkkPzBYZQE/JfMls9kM/f6Op8XfCKyGjgbA9IO4~F5hyXxf6g4cHyx51M3L98yyGBGG8VViB0hiy8nq2I03dF9RVx~kwSE7rJCnv0La==",
    "p4": "P3j3G62At2KefroARSRK5o8X3tV93JsxRrPzzwgHGQPHXJdZ1zLsgLfFku5YqmBxIM7cj/VE4HPRmPK9wmp2A1nKZrlQbzV/uApCZkMLB6cdB1eO8Gh9XV/1NRxN/xcxEIBuJ2mztJssWTkYsCTUC72AKRk/rTpcRYqaBCVJd2PObIBa4DF04Vhj9G~7Qs~DU8OL1PXJ/wxBITAvawKlnQOCRrwjTpeYFTEb5rhFWOCbhns1NurCVwzMZY6r~OTiQ5dklrBTU5WUh~MAP12NitjO3/NDWfiq8H/i16HXH82ALRpap2DnE6v/xoDMuT9MGOWk5SiA/JEU0vDlkPRz1scYp3FmIYeVV2Qk4Nc3JKTknvbRJXp/ehYUuLR7uHPsf9mSMtZKao823z~ke7HWdu~83NrOYxRrkarienwTvU9yY4NT3UHDgT26QfN53I3goKdfC/a6KH7PK9mbS/2I1wmr~geDx8Mi~~BdBJVfxS~tZTky/Q4wnYmk8egy8l5nmhMJu6t~sUeh6V8kMrY2shjIzPeM6PNcOYgeWjF2H3Xc518GnduM~VU4ngaXUkRPu2g6vbi4UoUo5sbFYhkI/YzwfQdQI5M~/HXEuY~WqcYmshPIT8QdCOukrScZ1QR0YW8ebdbqq34vmR4D3ktTKErFCo4tXd2OvldVg1QmQEVZgGZeweggF/IvpqzCfq1uM3bWfwPe~c~SrJFTFA6MdEr5DTxjyT1JHMjAReGjC6r/pTCJpzcmehRe7/oRy//gcpz16JNVOYfe/U9~HnYORflTEPK0qsfzo0wrBgRk4Y9FbU3u2Uw2NPz5wCG0VznmuqGT03RqlBXCMjKu1P8Nph0VW5jCvSb7crfRp0/G5pG6RRrjpL3BxEq8cNc86S1ez0X4mgfqdUl/wtRKVZLB6jCP9ccBTaLww4ofnzO0U34ET4m6TAs6ELOpd/~q~zA9GZUZ~WTvw~1IzEH8stTy7ETUq4EGdLVafT9fjWK1/jGsKE0pyfyEC9iQMFMqclHWs4DpqqB31lDa8MK5AjnsDakWXuVtVfQ2OMiv8~07Ee~raIKiOmoXkr9rOSp4iqDglKz7D25PslYOEzlMGM9jixyZUbFzhEEAA1YjG8EGAfGzY7R3RcLocLY3VnsfXD7ZrnC~OaiFW1us~02iLVETg/H68tpmqTNvAGg~1QmyGD12pKrZXqajkTFFnzqmofgnHo5jziIKRyEeLqsR/mHJhwu/jO1ukt8WHa9FCpzRwYd0lGYnaRqO8Grss6dt6eonf9QF4TolBMk138884hRnoKP05SsyJmKiVwvLBb91PGmDQjKtrGdzRwaKfVNlf60L/172h~h0khsnDyuXWz6P2/xXS8h2vnukmWeE4BNYflbW/voHp6FXu2JLMSydak0sjTFb6lIbstOmnygI6t2YToxtIdh1wApKgCrGfBIT2JCHmfieu0VzEjDnMejClnt0NMQxyCMlhmiSSZ0RPLXZzNZ10WrzjJXUDvS~pqUk37oumsCbQxf~sxLiB9WmBcppyiEKkIJvHv7RLRRnwWwhG2bPPkXhcrDxjMWdrDpB6/Z4OFNqaEU6me6pyiWgkKPXLT1cxDUkWlGkrpm7hlsaj1nxLIytbX8lHDx6D0g0n17AwrMUFB~vxTrk9mgzffhmrimAzow2DHt3gwm0JgecqhWtDG8/DZSBCGPKyg/otQc~1KLCvk8vc7VGPaGueastXIIW9wHJ~Sc06uHzhhh3cn48PvMeBFELB~wbfg6C9w~a~UwgHr6cM2CZUpFXUE1otBPAyAPkfOr3lnI87Tt1pyuOwBZnskTEvhYxMLqxuz4G4FHbpNughsjtUbYDy9uNcQhIfLkGTnS4e0RZ2d2sgZNEz73~LDYlP7ShOfw9zTx8TZKydZnsbb9jopelzSkNzLdT0jQmUq9fPCGampmDg1PkKmxrAhWrgiM7TrX89YGZM~l7GFrcIaYgdJY1MQxR59OeEJxFfysdrne90TnGcpvEKFGQf14q3R76tFw2isMrvmpTe42q50eDmCdWY/6ce3MW~1lcBMqqvtQYQ7cmLTmkhTXVFm4eJM5mwwMFwy0YTSscI2QErO0qGIwd5jCq4tKSTHj1k0Z8pbVxpjDaeiXEzDXE8turUPOd1ina~QL/ceredtvICyMZWD8KAxROMcSRgLHZMK7tgngoXck9c9gA2W3EEPAUwt4HuwoL6Wud95oLcTDqE4NjiAD8Aj2Bh8rYNPjYgqH0X6MFNv1JmBpVO4T3yImxsD41F2c5zYLiTmFCeuv0eWmeZWyLfopkkoqNS/~kMFyQngA6/CskpbWLGES/b2uKrIzEomLz3cy=",
    "p5": "web",
    "p6": "La1Tz5b19W/IHSehbEY5CoVn9sCOnR70UTlUC3xhlkLPTJonZG32Mn0q9QXcc7cF",
    "p7": "5f5357c8969e55ee5cbcc5060c1e6794c1088f8d0a7062c3cd1fcae2d55f2dbbcICxDsbcDDbbtCyzJhbFlBqldxjGpJIj",
    "p8": "eClbEjub",
    "p9": "BDUHo4BlXj9rkYN8gDZaYS7vFQAnuT6ngQN8xEEFD78=",
    "mode": "1"
}
response = requests.post(url, headers=headers, params=params, data=data)

print(response.text)
print(response)