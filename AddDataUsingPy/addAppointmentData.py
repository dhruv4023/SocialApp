
import time
from datetime import datetime, timedelta
import requests
from pymongo import MongoClient
import ssl
# DB_URL = "mongodb://localhost:27017"
DB_URL = "mongodb+srv://jittamsakhia02:azbxcy@cluster0.zcom8hp.mongodb.net/?retryWrites=true&w=majority"
# adding not adding the security by Secure Socket Layer
client = MongoClient(DB_URL)#, ssl_cert_reqs=ssl.CERT_NONE)


print("connected successfully")

db = client["AppointmentApp"]

# all collections
services = db["services"]

import random

def get_random_name():
    names = ["jittam","John", "Alice", "Bob", "Emma", "Michael", "Sophia", "William", "Olivia", "James", "Ava"]
    return random.choice(names)


def createData(_id, date, tm):
    name=get_random_name()
    data = {
        "_id": _id+"_"+str(int(time.time()*10000)),
        "name": name,
        "email": name+"@gmail.com",
        "contactNumber": "7600999183",
        "dateTime": {
            "date": str(date),
            "time": str(tm),
        },
        "message": "hello",
        "status": 0
    }
    return services.update_one({"_id": _id}, {
        "$push": {"appointmentList": {"$each": [data]}}})
    # return requests.post(
    #     url="https://appointmenserver.onrender.com/appointment/post/dhruv4023_Consultant",
    #     headers={
    #         "Content-Type": "application/json",
    #     },
    #     json=data
    # )


def fun(howmanyDays, noOfAppointmentPerday):
    timeSlotes = ["11:00-11:30", "11:30-12:00", "13:00-13:30", "13:30-14:00",
                  "14:00-14:30", "14:30-15:00", "15:00-15:30", "15:30-16:00"]
    today = datetime.now().date()
    today -= timedelta(days=3)
    for i in range(howmanyDays):
        today += timedelta(days=1)
        for i in range(noOfAppointmentPerday):
            "2023-05-05"
            time.sleep(0.5)
            print(createData(_id="jittam_Salon", date=today,
                  tm=timeSlotes[i % len(timeSlotes)]))
            print(today)
    print("inserted succesfully !")


fun(6, 5)
