import requests


headers = {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Language": "zh,zh-CN;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Origin": "https://turing.captcha.gtimg.com",
    "Pragma": "no-cache",
    "Referer": "https://turing.captcha.gtimg.com/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "cross-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
    "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
url = "https://turing.captcha.qcloud.com/cap_union_new_verify"
data = {
    "collect": "6rJBFdb1ZM97fK+EEI0zsJhEtCv71IvCpy6w49yQcn3AOO0Vqm719G2HQEsTQxoJve/x6Jyk562KUoFkUF4o/tFwrm1G6X+7xEg5caYQy/zESDlxphDL/NKckkqMU65IU3equrhXVW++fD6Et9tGXBlTGcQrtM9Uvnw+hLfbRlyK4EqWXEaH74rgSpZcRofvRQ/xg2Z8DbD8TRh26SxrpTX83245jysBZTbOetPxz8QtT834OkEghXHeQmtqDcaIsBbW2wjTFCb7K+8eTFg67LWuZVI355H3QgmUVYZEJljGRAiUwdGisARDTh97s+j0dy2t/ZZ3SuTJZkfebDgLY6J0naSw+Co4u5o/4hDrPezosXOqh8S9IXIDqmOsLGGi5YUspt0tUxTUZwJ6ncNhImMdG6d6EoJGOi0Si5HxZi0q6jK3xVejYnSCOgoHYIDz3zCKNG/k5ItJTeAAg2gT42QNBkP/6B7b9HVIz2+t6Ulxc/CGA8vFvDwl4lhyYxe6TFri6i2e7oCC7yUpupewx7UFfGwhCnYNGDZbMi81O+8L10x3NInHzz3KKScbaSwm6hnzyWAiOJbUZwJ6ncNhIqXPkhYHaZDyfTxCEjlZx3Aq6jK3xVejYiqFvgTFh5sofPypYo0jm+gPAAjyXJ35MJrQaV73YCeCbw9v71MTsH1r3lnUDIyM7qk+Pfq7G1k8Goldh3a1XD+/cvTy8+A+q6HolNynLADxDSPd68lWAIMZj9vTXyu6yBerSl01ZEFnN76+XmHYv/PSS90DwWTyf5hEtCv71IvC/CV6h4mlaDKzXvjqZHz9MlAdEEbfmyrm6NZ9p1M+TTI3aCqxKIhvuS0scfUxovNubgXIhAJCQjvvxY5zjyCGtPBEE6B82hm6TM01MK61Jq916rvI1l2y69GhiWAs+pubxMgSgZiiyCUfsuKt/K84NlJuYUCV4LzfZ81yuovfsisXc616R5nbaF36kpc1D+q1hLiT0xwwgx/D53K2XaNkGJkDwT/tpZWaAc6NzVufz8lCDVPV1gfO8ptxIIb2ZIg4IQLNkj44T7+xRUissqh+aU7i6A+X7fICGz96NsqPLt7GkVTd5DCk2NyKF2dLPcjv51++aLSUmST8IT9+COIREoiOiInLvnHtKbGbd4GgPHdPhD/Q9RbTwYD0asktjBcfe7HjOXNOEYYE7PV69VSSv96m4/v+vSizhFpfEM9pE73ZTJwiKEbwfoM2+cQlc50TRG0hG5OGZSRO2ueaEKDUS+1ZwXz171gV8AzVwh9LpLx5hl17FQRdgW5o9hOa0DhsQmHE2mGv+UmjP0eSIrU/L3gzJOxziSo9LZQXgP8+nh2IfLxzOn9zlPDMVfmKY5nrvr9YzDOiY/2YUGCmyUpa3bT358WnhBIRG/Wa91T2onXfjp/VtQtLk7dG9t8yrGw0XCFVaMYawo+vIsCdgg4UN8Wa5+aY7YBUg0lYlLd0pzca6Rz25ZEj9YxrCDtfzE3DAgEW61gEAG+jFanifV4MdqfvrX28amLZ5s35otcVgCiIt4fesE0z86WDxx0roMOEZ6wZYzE8RmlrXw4JBzxyaXVg9lMHUMt/ka882ip9tdGBrOh3n6HOBi/ttrjUVUOY3l5IcH3OS/RGmMeqzMELNJhEtCv71IvCpV/6D5r6vhRXYfl5qy1sU06gA5hrVh2xd/ykHcZz7L+mZqYtpD5s9w==",
    "tlg": "1720",
    "eks": "/hB5bdd/J1HV1L3ZGklWaYonkeLQ3Yi/8Wl5LNbq2d5TNZb+AW4RSHMyBrcprBX47bPsAO6ZJxmnTMKL7VmNZqbsPQg9zefuYxANPHkvOYuh8w1isRDk1/6EQzeqVoeKVkvEcOq7GFiMVXmYMdbYARsXjmN6Za4TefF2VHr2WdFjiUodiUTHGLHUt/dTLBj4NsrxiAGumDBkrrwklVZs6kktkkc6JiBkVACAK4OIF6s=",
    "sess": "s0ypEN78G4H5JHglo7Qu3otMo6xnKNT4Gc6PPK9A3XlLcTL1AA_rlTGDJwFU5GwJ9CJ2lbfELy9ZSOS1FhJJeisdXAKovVinoK0TLl3NFPv7wCJ_HjkW1mxg6FUT21LOW1wbX3CH4XWwZEHrtWT1lP9_F_Ew2L0jalSaXtmc1lwzflZPc20UuQKD5Apcb-_lVvSNML-xrI3hVaDdLm_sZRGWvZPH2163hoCNRKOh2Ro367QvCXn7gPbsdhoXN99Ga-lap-ZLX4owiLSqmq6ZUIPts0j_QY-uPOi1PbgnD3J8MAmzp6ewjOlQ7essg-1CysGozNEy6kOdUnZ5yLdu8B0WA2X7LRUGtTY6clElIlxBhYYeNWDfFJD4Dnz-Z5oz2I2fpRYOClQkpPOmuXG1y9Drt3lpjquIucUeWmTuPhVlM*",
    "ans": "[{\"elem_id\":1,\"type\":\"DynAnswerType_POS\",\"data\":\"413,123\"}]",
    "pow_answer": "c3e69cffa30379c9#5536",
    "pow_calc_time": "29"
}
response = requests.post(url, headers=headers, data=data)

print(response.text)
print(response)