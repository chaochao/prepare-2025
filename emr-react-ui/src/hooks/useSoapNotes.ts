import { useQuery } from "@tanstack/react-query";
import { createSoapNote, deleteSoapNote, fetchSoapNotes, updateSoapNote } from "@/services/soapNote";
import { useMutation } from "@tanstack/react-query";
import { SOAPFormData } from "@/components/soap-note-form";
import { queryClient } from "@/lib/queryClient";
export const useSoapNotes = () => {
  return useQuery({
    queryKey: ['soapNotes'], 
    queryFn: fetchSoapNotes,
  });
};

export const useCreateSoapNote = () => {
  return useMutation({
    mutationFn: createSoapNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['soapNotes'] });
    },
  });
};


export const useUpdateSoapNote = () => {
  
  return useMutation({
    mutationFn: ({ id, soapNote }: { id: string; soapNote: SOAPFormData }) => updateSoapNote(id, soapNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['soapNotes'] });
    },
  });
};

export const useDeleteSoapNote = () => {
  
  return useMutation({
    mutationFn: deleteSoapNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['soapNotes'] });
    },
  });
};