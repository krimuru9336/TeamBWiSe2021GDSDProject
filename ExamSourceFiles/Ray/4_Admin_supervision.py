
########View#############

class AdminCVCheckView(APIView):
    permission_classes = (IsAdminUser,)
    parsers_classes= [MultiPartParser, FormParser]
    #serializer_class = UpdateUserSerializer
    #serializer_class2=TutorsSerializer
    def get(self,request,id=None):
        #if request.query_params["email"]:        
         #email=request.query_params["email"]
         if id:
          queryset = FuldemyUser.objects.filter(is_teacher=True).filter(is_active_teacher=False).get(id=id)
          serializer_class = AdminSerializer(queryset)
          #if serializer_class.is_valid():
          return Response({"status": "success", "data": serializer_class.data}, status=status.HTTP_200_OK)
          #else:
           #return Response({"status": "error", "data": serializer_class.errors}, status=status.HTTP_400_BAD_REQUEST)
         queryset = FuldemyUser.objects.filter(is_teacher=True).filter(is_active_teacher=False).all()
         serializer_class2 = AdminSerializer(queryset,many=True)
         return Response({"status": "success", "data": serializer_class2.data}, status=status.HTTP_200_OK)

    def patch(self, request,id=None):
        #email=request.query_params["email"]
        queryset1 = FuldemyUser.objects.get(id=id)
        serializer = AdminUpdSerializer(queryset1,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({ "data": serializer.data})
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


############Serializer###########################################

class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = FuldemyUser
        fields = ['id','profile_pic','DOB','phone_number','first_name','last_name','address','email','password','skills_present','skills_text','CV','profile_pic','is_student','is_teacher','is_admin','is_active_teacher','price_hourly_in_eur'] 

