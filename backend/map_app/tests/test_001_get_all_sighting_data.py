from django.test import Client
from django.urls import reverse
from rest_framework.test import APITestCase
import json



"""
This test will send a get request to the end point "all_sightings". This endpoint must return the following Response status code of 200. This test only compares the first 10 objects in the json response.
"""

answer = [
  {
    "id": 1,
    "Sighting_date": "1995-07-05 08:43:00",
    "Created_date": "2020-12-07 22:05:00",
    "lat": "28.6492762300",
    "lon": "-80.7488239600",
    "User_ID": "iNaturalist",
    "Num_Adults": None,
    "Num_Calf": None,
    "Activity": "",
    "Comments": "",
    "Image": "https://inaturalist-open-data.s3.amazonaws.com/photos/106785923/medium.jpg"
  },
  {
    "id": 2,
    "Sighting_date": "2024-03-31 19:39:00",
    "Created_date": "2024-04-01 01:09:00",
    "lat": "25.5158432300",
    "lon": "-80.2049268500",
    "User_ID": "iNaturalist",
    "Num_Adults": None,
    "Num_Calf": None,
    "Activity": "",
    "Comments": "",
    "Image": "https://inaturalist-open-data.s3.amazonaws.com/photos/362124499/medium.jpg"
  },
  {
    "id": 3,
    "Sighting_date": "2024-03-29 14:59:00",
    "Created_date": "2024-03-31 02:18:00",
    "lat": "25.5191107300",
    "lon": "-80.2924935200",
    "User_ID": "iNaturalist",
    "Num_Adults": None,
    "Num_Calf": None,
    "Activity": "",
    "Comments": "",
    "Image": "https://static.inaturalist.org/photos/361790202/medium.jpeg"
  },
  {
    "id": 4,
    "Sighting_date": "2024-03-25 21:31:00",
    "Created_date": "2024-03-26 01:06:00",
    "lat": "28.7860474300",
    "lon": "-82.5186958300",
    "User_ID": "iNaturalist",
    "Num_Adults": None,
    "Num_Calf": None,
    "Activity": "",
    "Comments": "",
    "Image": "https://inaturalist-open-data.s3.amazonaws.com/photos/360443828/medium.jpeg"
  },
  {
    "id": 5,
    "Sighting_date": "2024-03-24 16:15:00",
    "Created_date": "2024-04-01 12:01:00",
    "lat": "30.3517395400",
    "lon": "-84.3738079900",
    "User_ID": "iNaturalist",
    "Num_Adults": None,
    "Num_Calf": None,
    "Activity": "",
    "Comments": "",
    "Image": "https://static.inaturalist.org/photos/362240282/medium.jpg"
  },
  {
    "id": 6,
    "Sighting_date": "2024-03-22 17:47:00",
    "Created_date": "2024-03-23 13:04:00",
    "lat": "24.4203331700",
    "lon": "-81.8973603100",
    "User_ID": "iNaturalist",
    "Num_Adults": None,
    "Num_Calf": None,
    "Activity": "",
    "Comments": "",
    "Image": "https://static.inaturalist.org/photos/359717568/medium.jpg"
  },
  {
    "id": 7,
    "Sighting_date": "2024-03-18 14:54:00",
    "Created_date": "2024-03-29 01:02:00",
    "lat": "27.9354617800",
    "lon": "-82.6594623300",
    "User_ID": "iNaturalist",
    "Num_Adults": None,
    "Num_Calf": None,
    "Activity": "",
    "Comments": "These manatees are 6-7 feet long and grey with algae on its back.It was eating something off the wall.",
    "Image": "https://static.inaturalist.org/photos/361162546/medium.jpeg"
  },
  {
    "id": 8,
    "Sighting_date": "2024-03-16 23:37:00",
    "Created_date": "2024-03-17 00:04:00",
    "lat": "25.0480469600",
    "lon": "-80.4918030500",
    "User_ID": "iNaturalist",
    "Num_Adults": None,
    "Num_Calf": None,
    "Activity": "",
    "Comments": "",
    "Image": "https://static.inaturalist.org/photos/358103690/medium.jpg"
  },
  {
    "id": 9,
    "Sighting_date": "2024-03-13 23:30:00",
    "Created_date": "2024-03-13 21:12:00",
    "lat": "24.6823765800",
    "lon": "-81.2368118000",
    "User_ID": "iNaturalist",
    "Num_Adults": None,
    "Num_Calf": None,
    "Activity": "",
    "Comments": "",
    "Image": "https://static.inaturalist.org/photos/359548012/medium.jpg"
  },
  {
    "id": 10,
    "Sighting_date": "2024-03-13 14:34:00",
    "Created_date": "2024-03-13 15:42:00",
    "lat": "25.9411818400",
    "lon": "-81.5435307500",
    "User_ID": "iNaturalist",
    "Num_Adults": None,
    "Num_Calf": None,
    "Activity": "",
    "Comments": "",
    "Image": "https://inaturalist-open-data.s3.amazonaws.com/photos/357234979/medium.jpg"
  },
]



class Test_all_items(APITestCase):
    fixtures=["sighting_data.json"]

    def test_001_all_sightings(self):
        
        response = self.client.get(reverse("all_sightings"))
        with self.subTest():
            self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content)[:10], answer)