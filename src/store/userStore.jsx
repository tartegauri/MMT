import { create } from 'zustand';

const userStore = create((set) => ({
    userId: null,
    phone: '',
    email: '',
    status:false,
    name:null,
    

    setUserId: (userId) => set({ userId }),
    setPhone: (phone) => set({ phone }),
    setEmail: (email) => set({ email }),
    setActive: (status) =>set({status}),
    setName: (name) =>set({name}), 
    updateUser: (data) => set((state) => ({ ...state, ...data })),

    logout: () => set({ userId: null, phone: '', email: '',status:false, name:null, }),
}));

export default userStore;