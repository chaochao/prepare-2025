import { useQuery } from "@tanstack/react-query";
import { createSoapNote, deleteSoapNote, fetchSoapNotes, updateSoapNote } from "@/services/soapNote";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SOAPFormData } from "@/components/soap-note-form";
export const useSoapNotes = () => {
  return useQuery({
    queryKey: ['soapNotes'], 
    queryFn: fetchSoapNotes,
  });
};

export const useCreateSoapNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSoapNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['soapNotes'] });
    },
  });
};


export const useUpdateSoapNote = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, soapNote }: { id: string; soapNote: SOAPFormData }) => updateSoapNote(id, soapNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['soapNotes'] });
    },
  });
};

export const useDeleteSoapNote = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteSoapNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['soapNotes'] });
    },
  });
};