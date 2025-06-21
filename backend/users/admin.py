from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    model = User
    # Admin panelinde gösterilecek alanlar
    list_display = ('tc_kimlik_no', 'email', 'first_name', 'last_name', 'is_staff')
    # Admin panelinde arama yapılacak alanlar
    search_fields = ('tc_kimlik_no', 'first_name', 'last_name', 'email')
    ordering = ('tc_kimlik_no',)

admin.site.register(User, CustomUserAdmin)
