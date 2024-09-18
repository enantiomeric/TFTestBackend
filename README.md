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