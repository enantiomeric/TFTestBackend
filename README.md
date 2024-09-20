# TechFusion 2k24

Backend for Techfusion Website 2k24.

#### Image Upload Format

```
POST /participant/uploadimage 
form-data


transactionImage : [FILE]


```

#### Registration Format 

```
POST /participant/register

{
    "name" : "Alex Smith",
    "email" : "alex@mail.com",
    "phone" : "1234567890",
    "college" : "Walchand",
    "year" : 2,
    "events" : [ "CodeCrush","CloudVerse","CodeDuet","Bid2Build"],
    "amount" : 200,
    "transactionLink" : "{screenshot link}",
    "transactionID" : "1234"
}

```


### Docker Run Example
```
docker run \
  -e DB_URI=mongodb://localhost:27017/Techfusion \
  -e CLOUD_NAME=name \
  -e API_KEY=123 \
  -e API_SECRET=abc \
  -e JWT_SECRET="123" \
  -e PORT=443 \
  -v /home/ubuntu/certificates:/home/certificates \
  -v /home/ubuntu/logs:/home/logs \
  -p 443:443 \
  <image_name>

````