from django.http import JsonResponse
from django.template.loader import render_to_string
from django.shortcuts import render, get_object_or_404

from .models import Book
from .forms import BookForm
# Create your views here.

def book_list(request):
    books = Book.objects.all()
    return render(request, 'books/book_list.html', {'books': books}) # This cascades towards the included partial_template (I mean the context)


def save_book_form(request, form, template_name):
    data = dict()  # Dictionary for the data to be used.
    if request.method == 'POST': 
        if form.is_valid():
            form.save()
            data['form_is_valid'] = True # This is used to validate on the JS side if the data was properly received by Django.
            books = Book.objects.all()
            data['html_book_list'] = render_to_string('books/include/partial_book_list.html', {
                'books': books
            }) # Generates the list with existing books
        else:
            data['form_is_valid'] = False
    context = {'form': form}
    data['html_form'] = render_to_string(template_name, context, request=request)
    return JsonResponse(data)


def book_create(request):
    if request.method == 'POST':
        form = BookForm(request.POST)
    else:
        form = BookForm()
    return save_book_form(request, form, 'books/include/partial_book_create.html')


def book_update(request, pk):
    book = get_object_or_404(Book, pk=pk) # Get the book or 404, simple stuff.
    if request.method == 'POST':
        form = BookForm(request.POST, instance=book) # Request POST data to a BookForm instance based on the book.
    else:
        form = BookForm(instance=book)
    return save_book_form(request, form, 'books/include/partial_book_update.html') # Passes this request to the save_book_form method for added processing.


def book_delete(request, pk):
    book = get_object_or_404(Book, pk=pk)
    data = dict()
    if request.method == 'POST':
        book.delete()
        data['form_is_valid'] = True # This is to play along existing code
        books = Book.objects.all()
        data['html_book_list'] = render_to_string('books/include/partial_book_list.html', {'books': books})
    else:
        context = {'book': book}
        data['html_form'] = render_to_string('books/include/partial_book_delete.html', context, request=request)
    return JsonResponse(data)