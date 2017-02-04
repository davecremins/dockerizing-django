from django.db import models
from django.conf import settings

class Tag(models.Model):
    id = models.TextField(primary_key=True, blank=False, null=False)
    tag = models.TextField(blank=False, null=False)
    date_created = models.DateField(auto_now=True)


class UserTagLink(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    tag = models.ForeignKey(Tag)