import ModuleModel from "./model.js";


export const createModule = (module) => ModuleModel.create(module);


export const findModulesByCourseId = (courseId) =>
  ModuleModel.find({ course: courseId }).populate('course');


export const findModuleById = (moduleId) => ModuleModel.findById(moduleId);


export const updateModule = (moduleId, module) =>
  ModuleModel.findByIdAndUpdate(moduleId, module, { new: true });


export const deleteModule = (moduleId) => ModuleModel.findByIdAndDelete(moduleId);
