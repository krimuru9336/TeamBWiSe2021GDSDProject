

#################### Model ###############
class TimeTable(models.Model):
    DAYS_OF_THE_WEEK = (
        ('1', 'SUNDAY'),
        ('2', 'MONDAY'),
        ('3', 'TUESDAY'),
        ('4', 'WEDNESDAY'),
        ('5', 'THURSDAY'),
        ('6', 'FRIDAY'),
        ('7', 'SATURDAY')
    )
    #course = models.ForeignKey(Course, on_delete=models.CASCADE)
    day = models.CharField(max_length=1, choices=DAYS_OF_THE_WEEK)
    
    def __str__(self):
        return self.get_day_display()

    class Meta:
        verbose_name = 'TIMETABLE'
        verbose_name_plural = 'TIMETABLE'
		
class TimeTableItem(models.Model):

    tutor_id = models.ForeignKey(FuldemyUser, on_delete=models.CASCADE)
    days_of_the_week = models.ForeignKey(TimeTable,on_delete=models.CASCADE)
    start_time = models.TimeField()
    end_time = models.TimeField()
	
	
	
	
	
########################### View ##########################################

class TimeView(APIView):

    def get(self,request, id=None):
        if id: 
            item = TimeTableItem.objects.filter(tutor_id=id)
            serializer = TimeSerializer(item,many=True)
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)

        queryset = TimeTableItem.objects.all()
        serializer_class = TimeSerializer(queryset,many=True)
        return Response(serializer_class.data)

    def patch(self, request):
        serializer = TimeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, format=None):
        timeid = get_object_or_404(TimeTableItem, id=id)
        timeid.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
