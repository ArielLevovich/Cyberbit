﻿using Cyberbit.TaskManager.Server.Models.Enums;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;

namespace Cyberbit.TaskManager.Server.Models.Dto
{
    public class TaskDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int CreatedByUserId { get; set; }
        public DateTime CreationTime { get; set; }
        public DateTime DueDate { get; set; }
        public int UserId { get; set; }

        [JsonIgnore]
        public UserDto User { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public TasksStatus Status { get; set; }

        public string UserName => User?.FirstName + " " + User?.LastName;

        public List<int> CategoryIds { get; set; }

        // [JsonIgnore]
        // public List<CategoryDto> Categories { get; set; }

        public List<string> CategoryNames { get; set; }
    }
}
