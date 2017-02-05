from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import Tag

from redis import Redis

redis = Redis(host='redis', port=6379)

@login_required
def home(request):
    if request.method == 'POST':
        data = request.POST.get('item_text', None)
        Tag.objects.create(tag=data)
        redis.publish('comms', data)
        return redirect('/')

    tags = Tag.objects.all()
    counter = redis.incr('counter')
    return render(request, 'home.html', {'tags': tags, 'counter': counter})
