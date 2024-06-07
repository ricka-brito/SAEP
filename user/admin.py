from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _

from user import models

class UserAdmin(BaseUserAdmin):
    """Define the admin pages for user"""
    ordering = ['id']
    list_display = ['id', 'first_name', 'last_name', 'email']
    fieldsets = (
        (None, {'fields': ('email', 'password',)}),
        (_('Personal info'), {'fields': ('first_name', 'last_name')}),
        (
            _('Permissions'),
            {
                'fields': (
                    'is_active',
                    'is_staff',
                    'is_superuser',
                )
            }
        ),
        (_('Important dates'), {'fields': ('last_login', 'created_at',)})
    )
    readonly_fields = ['last_login',  'created_at']

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'first_name',
                'last_name',
                'email',
                'password1',
                'password2',
                'is_active',
                'is_staff',
                'is_superuser'
            )
        }),
    )

admin.site.register(models.User, UserAdmin)