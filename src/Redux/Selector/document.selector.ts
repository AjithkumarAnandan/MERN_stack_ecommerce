import { createSelector } from "reselect";

export const imageListSelector= createSelector((state)=>state.documentData.downloaded, (subState)=>subState?.data??[]);
export const uploadedSelector= createSelector((state)=>state.documentData.uploaded, (subState)=>subState?.data??[]);
export const uploadImageListLoading= createSelector((state)=>state.documentData.uploaded, (subState)=>subState?.loading??[]);