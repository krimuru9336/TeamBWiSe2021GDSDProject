######Imports

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
import jwt
from datetime import datetime, timedelta
from django.conf import settings
from django.db.models import (Model, TextField, DateTimeField, ForeignKey,CASCADE)
							  
							  
							  
####################################Models for user registration and login####################################

def user_directory_path(instance, filename):
  
    # file will be uploaded to MEDIA_ROOT / user_<id>/<filename>
    return 'posts/{filename}'.format(filename=filename)

def CV_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'CV/{filename}'.format(filename=filename)

    """Model to store skills list."""

class Skills(models.Model):
    skill_name = models.CharField(null=False,max_length=30)
    skill_type = models.CharField(null=False,max_length=30)
    def __str__(self):
        return self.skill_name

class UserManager(BaseUserManager):
   # def create_user(self, email,first_name,last_name,address,DOB,phone_number,profile_pic=None,CV=None,skills_present=None , password=None):
    def create_user(self, email,first_name,last_name,address,DOB,phone_number,password=None,**extra_fields):

        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('Users must have an email address')
        if not extra_fields.get("CV"):
           CV=None
        else:
         CV=extra_fields.get("CV")
        if not extra_fields.get("profile_pic"):
           profile_pic=None
        else:
          profile_pic=extra_fields.get("profile_pic")
        if extra_fields.get("skills_present"):
         skills_text=str(extra_fields.get("skills_present"))
         x = skills_text.replace(">", "").split(", ")
         str1=""
         for i in x:
           sub=i.split(": ")[1]
           str1=str1+","+sub
         skills_text = str1[1:].replace("]", "")
        else:
          skills_text=""

        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            address=address,
            DOB=DOB,
            phone_number=phone_number,
            profile_pic=profile_pic,
            CV=CV,
            skills_text=skills_text
        )
        user.set_password(password)
        user.save(using=self._db)
        if  extra_fields.get("skills_present"):
         for i in extra_fields.get("skills_present"): 
          user.skills_present.add(i)
        #user.skills_present.add(skills_present[1])
        
        return user

    def create_student(self, email,first_name,last_name,address,DOB,phone_number, password=None,**extra_fields):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.create_user(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            address=address,
            DOB=DOB,
            phone_number=phone_number,
            profile_pic=extra_fields.get("profile_pic"),
            CV='settings.MEDIA_ROOT/CV/Sourajyoti_Datta_CV.pdf',
            skills_present=extra_fields.get("skills_present")

            
        )
        user.is_student = True
        user.set_password(password)
        user.save(using=self._db)
        return user


    def create_tutor(self, email,first_name,last_name,address,DOB,phone_number,password,**extra_fields):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.create_user(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            address=address,
            DOB=DOB,
            phone_number=phone_number,
            profile_pic=extra_fields.get("profile_pic"),
            CV=extra_fields.get("CV"),
            skills_present=extra_fields.get("skills_present")
             )
        user.is_teacher = True
        user.set_password(password)
        user.save(using=self._db)
        return user
    def create_superuser(self, email,first_name,last_name,address,DOB,phone_number, password,**extra_fields):

      user = self.create_user(
              email=email,
              first_name=first_name,
              last_name=last_name,
              address=address,
              DOB=DOB,
              phone_number=phone_number,
              profile_pic=extra_fields.get("profile_pic"),
              password=password,
              CV=extra_fields.get("CV"),
              )
      user.is_admin = True
      user.is_staff=True
      user.is_superuser = True
      user.save(using=self._db)
      return user


"""Model to store user list."""

# Create your models here.
class FuldemyUser(AbstractBaseUser, PermissionsMixin):
        email = models.EmailField(verbose_name="email",max_length=50,unique=True)
        first_name = models.CharField(null=False,max_length=30)
        last_name = models.CharField(null=False,max_length=30)
        address = models.CharField(max_length=255)
        DOB = models.DateField(max_length=255)
        registration_date = models.DateTimeField(auto_now=True)
        phone_number = models.IntegerField(unique=True)
        is_admin= models.BooleanField(default=False)
        is_superuser= models.BooleanField(default=False)
        is_staff = models.BooleanField(default=False)
        is_student= models.BooleanField(default=False)
        is_teacher= models.BooleanField(default=False)
        is_active_teacher= models.BooleanField(default=False)
        profile_pic = models.ImageField(upload_to =user_directory_path,default='default.jpg',blank=True)
        CV = models.FileField(upload_to =CV_directory_path,default='settings.MEDIA_ROOT/CV/dummy_CV.pdf',blank=True)
        #CV = models.CharField(max_length=255,default='None',editable=True)
        skills_present = models.ManyToManyField('AllUsers.Skills',blank=True, null=True)
        skills_text = models.CharField(max_length=255,default="",blank=True)
        price_hourly_in_eur= models.FloatField(default=0.0)

        objects = UserManager()

        USERNAME_FIELD="email"


        REQUIRED_FIELDS=['first_name','last_name','address','DOB','phone_number']


        def has_perm(self, perm, obj=None):
        # Simplest possible answer: Yes, always
         return True
        
        def __str__(self):
         return self.email


             return MyUser.get_email(self.user) + " - is_teacher"
			 
######VIEW for registration######


######Tutor######

class RegistrationTutorView(generics.GenericAPIView):
    # Allow any user (authenticated or not) to hit this endpoint.
    permission_classes = (AllowAny,)
    serializer_class = RegistrationAdminSerializer

    def post(self, request):
        serializer = self.get_serializer(data = request.data)


        # The create serializer, validate serializer, save serializer pattern
        # below is common and you will see it a lot throughout this course and
        # your own work later on. Get familiar with it.
        if(serializer.is_valid()):
            serializer.save()
            return Response({"status": "success", "data": serializer.data})
        else:
         return Response({"status": "error", "data": serializer.errors})  

######Student######

class RegistrationStudentAPIView(generics.GenericAPIView):
    # Allow any user (authenticated or not) to hit this endpoint.
    permission_classes = (AllowAny,)
    serializer_class = RegistrationStudentSerializer

    def post(self, request):
        #user = request.data.get('user', {})
        serializer = self.get_serializer(data = request.data)
        data={}

        # The create serializer, validate serializer, save serializer pattern
        # below is common and you will see it a lot throughout this course and
        # your own work later on. Get familiar with it.
        if(serializer.is_valid()):
            serializer.save()
		 return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
            
        else:
          return Response({"status": "error", "data": serializer.errors})     
  
  
######Serializer for Registration#####################################
 
 
 class RegistrationTutorSerializer(serializers.ModelSerializer):

    """Serializers registration requests and creates a new tutor."""

    # Ensure passwords are at least 8 characters long, no longer than 128
    # characters, and can not be read by the client.
    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True
    )

    # The client should not be able to send a token along with a registration
    # request. Making `token` read-only handles that for us.
    token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = FuldemyUser
        # List all of the fields that could possibly be included in a request
        # or response, including fields specified explicitly above.
        fields = ['id','email','first_name','last_name','address','DOB','phone_number','profile_pic','password','CV','token','skills_present']

    def create(self, validated_data):
        # Use the `create_user` method we wrote earlier to create a new user.
        return FuldemyUser.objects.create_tutor(**validated_data)




class RegistrationStudentSerializer(serializers.ModelSerializer):

    """Serializers registration requests and creates a new student."""

    # Ensure passwords are at least 8 characters long, no longer than 128
    # characters, and can not be read by the client.
    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True
    )

    # The client should not be able to send a token along with a registration
    # request. Making `token` read-only handles that for us.
    token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = FuldemyUser
        # List all of the fields that could possibly be included in a request
        # or response, including fields specified explicitly above.
        fields = ['id','email','first_name','last_name','address','DOB','phone_number', 'password','token','profile_pic']

    def create(self, validated_data):
        # Use the `create_user` method we wrote earlier to create a new user.
        return FuldemyUser.objects.create_student(**validated_data)


class RegistrationAdminSerializer(serializers.ModelSerializer):

    """Serializers registration requests and creates a new admin."""

    # Ensure passwords are at least 8 characters long, no longer than 128
    # characters, and can not be read by the client.
    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True
    )

    # The client should not be able to send a token along with a registration
    # request. Making `token` read-only handles that for us.
    token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = FuldemyUser
        # List all of the fields that could possibly be included in a request
        # or response, including fields specified explicitly above.
        fields = ['email','first_name','last_name','address','DOB','phone_number', 'password','token','profile_pic','CV']

    def create(self, validated_data):
        # Use the `create_user` method we wrote earlier to create a new user.
        return FuldemyUser.objects.create_supeeruser(**validated_data)

 
 
 
 
 
 
 
 
 
 
 
 
 
