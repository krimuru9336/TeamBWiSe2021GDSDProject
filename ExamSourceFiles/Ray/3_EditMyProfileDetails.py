
####################### View  ##########################


class UserAvatarUpload(APIView):
    permission_classes = (IsAuthenticated,)
    parsers_classes= [MultiPartParser, FormParser]
    serializer_class = UpdateUserSerializer
    serializer_class2=TutorsSerializer
    def get(self,request,*args):
        #email=request.query_params["email"]
         serializer = self.serializer_class(request.user)
     # item = FuldemyUser.objects.get(email=email)
       # serializer = TutorsSerializer(item)
         return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)

    def patch(self, request):
        serializer1 = self.serializer_class(request.user)
        email1=serializer1.data['email']
        item = FuldemyUser.objects.get(email=email1)
        serializer = UpdateUserSerializer(item,data=request.data,partial=True)
        if serializer.is_valid():
          if 'profile_pic' in serializer.validated_data.keys():
            serializer.validated_data['is_active_teacher'] = False
            #serializer.data.is_active_teacher = True 
          if 'CV' in serializer.validated_data.keys():
            serializer.validated_data['is_active_teacher'] = False
          serializer.save()
          return Response({ "data": serializer.data})
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

##################################################Serializer##################


class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = FuldemyUser
        fields = ['id','profile_pic','DOB','phone_number','first_name','last_name','address','email','password','skills_present','skills_text','CV','profile_pic','is_student','is_teacher','is_admin','is_active_teacher','price_hourly_in_eur'] 


