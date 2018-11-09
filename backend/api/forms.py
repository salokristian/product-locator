from django import forms
from django.contrib.postgres.forms import SimpleArrayField


class FloorForm(forms.ModelForm):
    """
    Floors need a separate form to enable entering 2D arrays into the points field.
    """
    points = SimpleArrayField(
        SimpleArrayField(
            forms.IntegerField(),
            delimiter='|'
        ),
        help_text="""Separate nested arrays with a comma "," and elements in the
nested arrays by a pipe "|". E.g. "0,0 | 10,0 | 10,10 | 0,10\".""")
