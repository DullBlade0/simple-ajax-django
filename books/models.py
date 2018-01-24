from django.db import models

# Create your models here.
class Book(models.Model):
    HARDCOVER = 1
    PAPERBACK = 2
    ERROR = 3
    BOOK_TYPES = (
        (HARDCOVER, 'Hardcover'),
        (PAPERBACK, 'Paperback'),
        (ERROR, 'E-Book')
    )
    title = models.CharField(max_length=120)
    publication_date = models.DateField(null=True)
    author = models.CharField(max_length=120, blank=True)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    pages = models.IntegerField(blank=True, null=True)
    book_type = models.PositiveIntegerField(choices=BOOK_TYPES)

    def __str__(self):
        return '{} - {}'.format(self,title, self.author)
