from django.db import models
"""from django.contrib.auth.models import User"""

class Item(models.Model):
    """user = models.ForeignKey(User)"""
    text = models.TextField(blank=False, null=False)
    date_posted = models.DateField(auto_now=True)
