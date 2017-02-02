from django.shortcuts import render, redirect
from .models import Item
from redis import Redis


redis = Redis(host='redis', port=6379)


def home(request):
    #Get User from sessionid
    print('Posting to redis bus')
    data = request.POST.get('item_text', None)
    redis.publish('comms', data)
        
    if request.method == 'POST':
        Item.objects.create(text=data)
        return redirect('/')
    items = Item.objects.all()
    counter = redis.incr('counter')
    return render(request, 'home.html', {'items': items, 'counter': counter})
