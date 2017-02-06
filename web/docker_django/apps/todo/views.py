from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import Tag, UserTagLink

from redis import Redis

redis = Redis(host='redis', port=6379)

@login_required
def home(request):
    if request.method == 'POST':
        return create_new_sub_tag(request)
    return list_subbed_tags_for_user(request)

def create_new_sub_tag(request):
    tags = request.POST.get('item_tags', None)
    coords = request.POST.get('coords', None)
    newTagObj = Tag.objects.create(tag=tags)
    UserTagLink.objects.create(tag=newTagObj,user=request.user)
    data = {'coords': coords, 'tags': tags, 'userId': request.user.id}
    redis.publish('comms', data)
    return redirect('/')

def list_subbed_tags_for_user(request):
    tags = Tag.objects.filter(usertaglink__user_id=request.user.id)
    counter = redis.incr('counter')
    return render(request, 'home.html', {'tags': tags, 'counter': counter})
