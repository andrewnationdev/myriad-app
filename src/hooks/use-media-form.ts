import { useState, type FormEvent } from 'react';
import type { IMediaItem, TMediaStatus, TMediaType } from '../schema/media';

type MediaDraft = Omit<IMediaItem, 'id'>;

interface UseMediaFormParams {
  addItem: (item: MediaDraft) => void;
  updateItem: (item: IMediaItem) => void;
}

export function useMediaForm({ addItem, updateItem }: UseMediaFormParams) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formType, setFormType] = useState<TMediaType>('movies');
  const [formStatus, setFormStatus] = useState<TMediaStatus>('wishlist');
  const [formRating, setFormRating] = useState(3);
  const [formNotes, setFormNotes] = useState('');

  const resetForm = () => {
    setEditingId(null);
    setFormTitle('');
    setFormType('movies');
    setFormStatus('wishlist');
    setFormRating(3);
    setFormNotes('');
  };

  const openCreate = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEdit = (item: IMediaItem) => {
    setEditingId(item.id);
    setFormTitle(item.title);
    setFormType(item.type);
    setFormStatus(item.status);
    setFormRating(item.rating);
    setFormNotes(item.notes);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formTitle.trim()) return;

    const mediaData: MediaDraft = {
      title: formTitle,
      type: formType,
      status: formStatus,
      rating: Number(formRating),
      notes: formNotes,
    };

    if (editingId !== null) {
      updateItem({ id: editingId, ...mediaData });
    } else {
      addItem(mediaData);
    }

    resetForm();
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    editingId,
    formTitle,
    setFormTitle,
    formType,
    setFormType,
    formStatus,
    setFormStatus,
    formRating,
    setFormRating,
    formNotes,
    setFormNotes,
    openCreate,
    openEdit,
    closeModal,
    handleSave,
  };
}