/** @module @category API */
import type { UploadedFile } from './types';
import { openmrsFetch } from './openmrs-fetch';

export const attachmentUrl = '/ws/rest/v1/attachment';

export function getAttachmentByUuid(attachmentUuid: string, abortController: AbortController) {
  return openmrsFetch(`${attachmentUrl}/${attachmentUuid}`, {
    signal: abortController.signal,
  });
}

export function getAttachments(patientUuid: string, includeEncounterless: boolean, abortController: AbortController) {
  return openmrsFetch(`${attachmentUrl}?patient=${patientUuid}&includeEncounterless=${includeEncounterless}`, {
    signal: abortController.signal,
  });
}

export async function createAttachment(patientUuid: string, fileToUpload: UploadedFile) {
  const formData = new FormData();

  formData.append('fileCaption', fileToUpload.fileDescription);
  formData.append('patient', patientUuid);

  if (fileToUpload.file) {
    formData.append('file', fileToUpload.file);
  } else {
    formData.append('file', new File([''], fileToUpload.fileName), fileToUpload.fileName);
    formData.append('base64Content', fileToUpload.base64Content);
  }

  return openmrsFetch(`${attachmentUrl}`, {
    method: 'POST',
    body: formData,
  });
}

export function deleteAttachmentPermanently(attachmentUuid: string, abortController: AbortController) {
  return openmrsFetch(`${attachmentUrl}/${attachmentUuid}`, {
    method: 'DELETE',
    signal: abortController.signal,
  });
}
