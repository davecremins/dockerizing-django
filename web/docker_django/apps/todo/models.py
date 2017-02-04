from django.db import models
"""from django.contrib.auth.models import User"""

class Tag(models.Model):
    """user = models.ForeignKey(User)"""
    tag = models.TextField(blank=False, null=False)
    date_posted = models.DateField(auto_now=True)

class User(models.Model):
    id = models.TextField(blank=False, null=False)
    description = models.TextField(blank=False, null=False)

class UserTagLink(models.Model):
    user = models.ForeignKey(User)
    tag = models.ForeignKey(Tag)