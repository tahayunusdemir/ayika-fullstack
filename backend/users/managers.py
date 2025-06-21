from django.contrib.auth.base_user import BaseUserManager


class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where tc_kimlik_no is the unique identifiers
    for authentication instead of usernames.
    """
    def create_user(self, tc_kimlik_no, email, password, **extra_fields):
        """
        Create and save a User with the given tc_kimlik_no, email and password.
        """
        if not tc_kimlik_no:
            raise ValueError('The T.C. Kimlik Numarası must be set')
        if not email:
            raise ValueError('The Email must be set')
            
        email = self.normalize_email(email)
        user = self.model(tc_kimlik_no=tc_kimlik_no, email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, tc_kimlik_no, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given tc_kimlik_no, email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self.create_user(tc_kimlik_no, email, password, **extra_fields) 