from django.test import Client
from django.urls import reverse
from rest_framework.test import APITestCase
import json


"""
This test will send a get request to the end point "all_sightings". This endpoint must return the following Response status code of 200. This test only compares the first 10 objects in the json response.
"""

answer = [
    {
        "id": 2,
        "sighting_date": "2024-03-31 15:39 EST",
        "created_date": "2024-04-13 00:06:53",
        "lat": "25.515843230000000",
        "lon": "-80.204926850000000",
        "data_source": "iNaturalist",
        "num_Adults": None,
        "num_Calf": None,
        "activity": "",
        "comments": "",
        "image": "https://inaturalist-open-data.s3.amazonaws.com/photos/362124499/medium.jpg",
        "user": None,
    },
    {
        "id": 3,
        "sighting_date": "2024-03-29 10:59 EST",
        "created_date": "2024-04-13 00:06:53",
        "lat": "25.519110730000000",
        "lon": "-80.292493520000000",
        "data_source": "iNaturalist",
        "num_Adults": None,
        "num_Calf": None,
        "activity": "",
        "comments": "",
        "image": "https://static.inaturalist.org/photos/361790202/medium.jpeg",
        "user": None,
    },
    {
        "id": 4,
        "sighting_date": "2024-03-25 17:31 EST",
        "created_date": "2024-04-13 00:06:53",
        "lat": "28.786047430000000",
        "lon": "-82.518695830000000",
        "data_source": "iNaturalist",
        "num_Adults": None,
        "num_Calf": None,
        "activity": "",
        "comments": "",
        "image": "https://inaturalist-open-data.s3.amazonaws.com/photos/360443828/medium.jpeg",
        "user": None,
    },
    {
        "id": 5,
        "sighting_date": "2024-03-24 12:15 EST",
        "created_date": "2024-04-13 00:06:53",
        "lat": "30.351739540000000",
        "lon": "-84.373807990000000",
        "data_source": "iNaturalist",
        "num_Adults": None,
        "num_Calf": None,
        "activity": "",
        "comments": "",
        "image": "https://static.inaturalist.org/photos/362240282/medium.jpg",
        "user": None,
    },
    {
        "id": 6,
        "sighting_date": "2024-03-22 13:47 EST",
        "created_date": "2024-04-13 00:06:53",
        "lat": "24.420333170000000",
        "lon": "-81.897360310000000",
        "data_source": "iNaturalist",
        "num_Adults": None,
        "num_Calf": None,
        "activity": "",
        "comments": "",
        "image": "https://static.inaturalist.org/photos/359717568/medium.jpg",
        "user": None,
    },
    {
        "id": 7,
        "sighting_date": "2024-03-18 10:54 EST",
        "created_date": "2024-04-13 00:06:53",
        "lat": "27.935461780000000",
        "lon": "-82.659462330000000",
        "data_source": "iNaturalist",
        "num_Adults": None,
        "num_Calf": None,
        "activity": "",
        "comments": "These manatees are 6-7 feet long and grey with algae on its back.It was eating something off the wall.",
        "image": "https://static.inaturalist.org/photos/361162546/medium.jpeg",
        "user": None,
    },
    {
        "id": 8,
        "sighting_date": "2024-03-16 19:37 EST",
        "created_date": "2024-04-13 00:06:53",
        "lat": "25.048046960000000",
        "lon": "-80.491803050000000",
        "data_source": "iNaturalist",
        "num_Adults": None,
        "num_Calf": None,
        "activity": "",
        "comments": "",
        "image": "https://static.inaturalist.org/photos/358103690/medium.jpg",
        "user": None,
    },
    {
        "id": 9,
        "sighting_date": "2024-03-13 19:30 EST",
        "created_date": "2024-04-13 00:06:53",
        "lat": "24.682376580000000",
        "lon": "-81.236811800000000",
        "data_source": "iNaturalist",
        "num_Adults": None,
        "num_Calf": None,
        "activity": "",
        "comments": "",
        "image": "https://static.inaturalist.org/photos/359548012/medium.jpg",
        "user": None,
    },
    {
        "id": 10,
        "sighting_date": "2024-03-13 10:34 EST",
        "created_date": "2024-04-13 00:06:53",
        "lat": "25.941181840000000",
        "lon": "-81.543530750000000",
        "data_source": "iNaturalist",
        "num_Adults": None,
        "num_Calf": None,
        "activity": "",
        "comments": "",
        "image": "https://inaturalist-open-data.s3.amazonaws.com/photos/357234979/medium.jpg",
        "user": None,
    },
    {
        "id": 11,
        "sighting_date": "2024-03-11 07:47 EST",
        "created_date": "2024-04-13 00:06:53",
        "lat": "25.008696130000000",
        "lon": "-80.967865950000000",
        "data_source": "iNaturalist",
        "num_Adults": None,
        "num_Calf": None,
        "activity": "",
        "comments": "",
        "image": "https://static.inaturalist.org/photos/356816767/medium.jpeg",
        "user": None,
    },
]


class Test_all_items(APITestCase):
    fixtures = ["sighting_data.json"]

    def test_001_all_sightings(self):

        response = self.client.get(reverse("all_sightings"))
        with self.subTest():
            self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content)[:10], answer)
