using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfilles : Profile
    {
         public MappingProfilles()
        {
            CreateMap<Activity, Activity>();
        }
    }
}
