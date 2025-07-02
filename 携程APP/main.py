import requests
import json


headers = {
    "accept": "application/json",
    "accept-language": "zh,zh-CN;q=0.9",
    # "cache-control": "no-cache",
    "content-type": "application/json;charset=UTF-8",
    # "origin": "https://hotels.ctrip.com",
    # "p": "49801652215",
    # "phantom-token": "1004-common-pfNrSDW7Gyt5wDseo4vlgy4Fvnhj5lv3qwmdJ7URHXIBAidFydPjg5ypTYa5EnFwcQRqPiDOizoYnZwm1EMBwpfYt0Rl1j1SWGZElSjUqwpDjSpET6xAYXBj91wlAWnMRgGyoAEncyg1vkNYPNWopyksibpEzPvTMR9Lv5NWmmKcmIoYzNJtFYzaIbhK5Sek8jQFE5ZySEZBinqYTElgYzty0Eg3Y4NyDNKFXigLjLojNqWZ9yT0In1wtzjdPwkne9sEtfIDpwGcikFRpEhOYmQyzlKHcik6jF4j9LWBHy6E8AYDlyZPW3Qeq6y9OjnEZHikhy1twnUimlvDmYhNjamwdPIMLxaAy3Ekli97JS8RBEHOYbFwLPwHleZcjsAIAElLiFZJXbYUEU1YmOwzdEL6wNMimbxZ9eqoYLFwb0jQkxtQyMEMHifgJNXWpE5aYqawhlwBpKm4jn1wGpr4DefPYFEPkiBUJU0YsaW94YXOJpEgGYXTy5ZWl5JOETOYBqyfQYmbY9EDOYMswOnwXUKZtjhlwNUrB6iPtvGqjQEHDi3AJmBYODWnLY3SJbE7SYdXyalW79JQE08YhBy4UY9aiMEBTYMlwtNihQEPqjFbeM4i30YqTx9zyMEMoic3JqMYUEm4YshwgpiGsENaj51eH3imFYUFw1nIFqE9BjDE1pizZJbXEbde4tjlOIOEL5Y1QwS7y3GeADwFmjnBwO3jcoJltjLHEzawSswg8KbE5XitkJLnWpE10YTMwQcyGoezFybqES4WkXEcgIgE9FigBJUEh1YOtJ57w47EZE7pYzgJQ7it7jpEg3YfnJDFjTpYhE84YLHJ15wtcwQEGAYmnJTBi5ZJDEncYGNJtMifoynElpYs9wD9wmQwhPY9E0Zif3Jh7RUEfQY9tw05EsZyTdvp4WhQjfENhiGnJQaRlEFUYndw1bwd9KL4ezlW9Ly4bw1gjPbYAEG0iFGJT8RUDE9AIsYkTy6dvDZEHgR81yToEO9ybtvF0YdFWZ6EknitkJ6OiGFWqgRnBIDqwl6EZOwcXizpJ0UYqHrBqWHGIXTYb6yU7K3MIpmwhqe0YG0YS1voOIdzJPSvUOyFcw58J4mJ7LEhZYBne8OW7NJF5jfdw4qe8GEs9w5cj0mEqfeHUjScyMtW58R4mealvgPvknwsDWa8JhaE6tvoSy6difQYXBJ70jF8EZgRtbKHY4UKF3R0Mr1owQ8vp9Y0aw10iPQJTZYg6wdPEtHrtoWUYdOwPpR4yHLYtsEN3Emgxmcr5YqPKZ5WfQy9dvhkeGQYoaidAYN8Id8epSI4YlTwLXR8oW6ke5bEOzjQ8WhTE5MKQmwdY5AJGaEDaw5frPHKdPr9ax3EdYUOytMIntyNURhMvBbYGFWmaefURz9W7UjohW3dID1JXHEaYXAEAzimDitMRBdvcGYOXWZceLhRS1WPTED9WdOihTvOFv4Y35ESzrdOr7XEPUjGLJcFyNQwN6x0YXUWqZEl9jAOYtUiaDwQBRTkE7dWO8efUi5EPYcGKpfJM4WSpJlgwSzwttKZYFUY4fwnUe9Pj46wPqvtcjOkjN0JzPWOYqFJNFibwhPY36WqqxlgrgYNHWdHi44KhDjkfw43vscj9bE9TjUsyTY06ikpib9YNXJdAW3AJzsyDbKZYGSr4OWgzx1hjhfi0oiB1x4LWH7j9rmMxpPYkAwsHIBrkylgxOAYt7jZXjo9WAj3LrthY3kWQYc6rM8xH3RdHRmlWF5Y5nWBkWDNYD9rMdRBs",
    # "pragma": "no-cache",
    # "priority": "u=1, i",
    # "referer": "https://hotels.ctrip.com/",
    # "sec-ch-ua": "\"Chromium\";v=\"136\", \"Google Chrome\";v=\"136\", \"Not.A/Brand\";v=\"99\"",
    # "sec-ch-ua-mobile": "?0",
    # "sec-ch-ua-platform": "\"Windows\"",
    # "sec-fetch-dest": "empty",
    # "sec-fetch-mode": "cors",
    # "sec-fetch-site": "same-site",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"
}
cookies = {
    "_RGUID": "b50b2735-fb73-4764-9a80-0b70ab6c3ef0",
    "_RSG": "aTqSxNp9BKBmx3Rh2t20g9",
    "_RDG": "28da4b92e00fb62d410afcebc7b28bf0d7",
    "Hm_lvt_a8d6737197d542432f4ff4abc6e06384": "1747920435",
    "HMACCOUNT": "59A7892472AB65C1",
    "UBT_VID": "1747920435301.c4c352zljA7h",
    "_ga": "GA1.1.738671122.1747920436",
    "GUID": "09031046414161967816",
    "_RF1": "14.120.55.55",
    "MKT_CKID": "1747920438113.mo5lm.c3u3",
    "MKT_Pagesource": "PC",
    "manualclose": "1",
    "ibulanguage": "CN",
    "ibulocale": "zh_cn",
    "cookiePricesDisplayed": "CNY",
    "librauuid": "",
    "nfes_isSupportWebP": "1",
    "qrcode": "da92ae53f37744859c39dc22380961a1",
    "cticket": "67DA4FC76DE5A53BB3017D3A51465BB6C5F8B560FD06DD813D05322DF5BD12D5",
    "login_type": "0",
    "login_uid": "1AF0BD706E031A80ACABDD8150BC301C",
    "DUID": "u=A069173E7A8AF71A49FB477F2AD5883D&v=0",
    "IsNonUser": "F",
    "AHeadUserInfo": "VipGrade=0&VipGradeName=%C6%D5%CD%A8%BB%E1%D4%B1&UserName=&NoReadMessageCount=0",
    "_udl": "708D70C2B179E2F91CC5ED1C2CCE362D",
    "Hm_lpvt_a8d6737197d542432f4ff4abc6e06384": "1747920598",
    "_ga_9BZF483VNQ": "GS2.1.s1747920436$o1$g1$t1747920612$j0$l0$h0",
    "_ga_5DVRDQD429": "GS2.1.s1747920435$o1$g1$t1747920612$j0$l0$h0",
    "_ga_B77BES1Z8Z": "GS2.1.s1747920435$o1$g1$t1747920612$j46$l0$h0",
    "_bfa": "1.1747920435301.c4c352zljA7h.1.1747920598309.1747920613793.1.8.102002",
    "_jzqco": "%7C%7C%7C%7C1747920438374%7C1.788103249.1747920438111.1747920598996.1747920614369.1747920598996.1747920614369.0.0.0.5.5"
}
url = "https://m.ctrip.com/restapi/soa2/31454/json/fetchHotelList"
data = {
    "hotelIdFilter": {
        "hotelAldyShown": [
            "1073814",
            "441585",
            "119371280",
            "1618828",
            "29471774",
            "346412",
            "15878972",
            "434019",
            "436187",
            "2895314",
            "15882167",
            "22755589",
            "684340",
            "56206569",
            "686139",
            "469055",
            "6337433",
            "1230251",
            "112976684",
            "22767851",
            "81443661",
            "120461008",
            "104338970",
            "17284331",
            "125760137",
            "116620590",
            "479628",
            "1256432",
            "90105082",
            "65822792",
            "1415457",
            "66369153",
            "77361273",
            "436255",
            "13819538",
            "605794",
            "95472738",
            "6485297",
            "77369332",
            "485226",
            "79030411",
            "125442316",
            "453317",
            "1634763",
            "431900",
            "15899894",
            "433514",
            "98549609"
        ]
    },
    "destination": {
        "type": 1,
        "geo": {
            "cityId": 2,
            "countryId": 1
        },
        "keyword": {
            "word": ""
        }
    },
    "date": {
        "dateType": 1,
        "dateInfo": {
            "checkInDate": "20250522",
            "checkOutDate": "20250523"
        }
    },
    "filters": [
        {
            "filterId": "17|1",
            "type": "17",
            "subType": "2",
            "value": "1"
        },
        {
            "filterId": "29|1",
            "type": "29",
            "value": "1|1",
            "subType": "2"
        }
    ],
    "extraFilter": {
        "childInfoItems": [],
        "sessionId": "ebe1343652f446f7b6b44d4bf51bedb0"
    },
    "paging": {
        "pageCode": "102002",
        "pageIndex": 5,
        "pageSize": 10
    },
    "roomQuantity": 1,
    "recommend": {
        "nearbyHotHotel": {}
    },
    "genk": True,
    "residenceCode": "CN",
    "head": {
        "platform": "PC",
        "cid": "09031046414161967816",
        "cver": "hotels",
        "bu": "HBU",
        "group": "ctrip",
        "aid": "",
        "sid": "",
        "ouid": "",
        "locale": "zh-CN",
        "timezone": "8",
        "currency": "CNY",
        "pageId": "102002",
        "vid": "1747920435301.c4c352zljA7h",
        "guid": "09031046414161967816",
        "isSSR": False
    },
    "ServerData": ""
}
data = json.dumps(data, separators=(',', ':'))
response = requests.post(url, headers=headers, cookies=cookies, data=data)

print(response.text)
print(response)