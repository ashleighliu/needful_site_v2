import { httpService } from "./httpService";

const updateTasks = async (tasks: any, email: string) => {
  try {
    const payload = { tasks, email };
    const response = await httpService({
      url: `tasks/updatetasks`,
      method: "POST",
      data: payload,
    });
    return [
      ...response.tasks,
      {
        id: Math.random().toString(36).substr(2, 9),
        task: "",
        dueDate: null,
        completed: false,
        label: null,
        audioPath: "",
        hasAudio: false,
        localAudioPath: "",
        duration: 0,
        transcript: "",
      },
    ];
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getCurrentTasks = async (email: string) => {
  try {
    const payload = { email };
    const response = await httpService({
      url: `tasks/gettasks`,
      method: "POST",
      data: payload,
    });

    return [
      ...response.tasks,
      {
        id: Math.random().toString(36).substr(2, 9),
        task: "",
        dueDate: null,
        completed: false,
        label: null,
        audioPath: "",
        hasAudio: false,
        localAudioPath: "",
        duration: 0,
        transcript: "",
      },
    ];
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getTranscriptInfo = async (
  email: string,
  transcript: string,
  audioNameOfS3: string,
  duration: string,
  localAudioPath: string
) => {
  try {
    const payload = {
      email,
      transcript,
      hasAudio: true,
      audioNameOfS3,
      duration,
      localAudioPath,
    };
    console.log(transcript);
    const response = await httpService({
      url: `tasks/gettranscriptinfo`,
      method: "POST",
      data: payload,
    });

    return [
      ...response.tasks,
      {
        id: Math.random().toString(36).substr(2, 9),
        task: "",
        dueDate: null,
        completed: false,
        label: null,
        audioPath: "",
        hasAudio: false,
      },
    ];
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getPresignedUrl = async (audioNameOfS3: string, operation: string) => {
  try {
    const payload = { audioNameOfS3, operation };
    const response = await httpService({
      url: `tasks/getpresignedurl`,
      method: "POST",
      data: payload,
    });

    return response.url;
  } catch (error) {
    console.error("Error getting presigned URL:", error);
    return null;
  }
};

const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

const TaskService = {
  updateTasks,
  getCurrentTasks,
  getTranscriptInfo,
  getPresignedUrl,
};

export default TaskService;
