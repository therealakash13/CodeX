import { Injectable } from '@angular/core';
import { getDoc, getFirestore } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { Snippet } from '../models/snippet.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private db?: any;
  constructor(private auth: AuthService, private toastr: ToastrService) {
    this.db = getFirestore();
  }

  async addSnippet(snippet: Snippet) {
    try {
      const docRef = await addDoc(collection(this.db, 'snippets'), {
        ...snippet,
        createdAt: new Date(),
        createdBy: this.auth.getUid(),
      });
      this.toastr.success('Snippet Created Successfully', 'Success', {
        closeButton: true,
      });
    } catch (e) {
      this.toastr.error('Error while Creating Snippet', 'Error', {
        closeButton: true,
      });
    }
  }

  async getSnippets() {
    let data: any[] = [];
    const querySnapshot = await getDocs(collection(this.db, 'snippets'));
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data()}`);
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  }

  async getSnippetById(id: string) {
    const docRef = doc(this.db, 'snippets', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
    } else {
      // docSnap.data() will be undefined in this case
      this.toastr.warning('No Such File', 'Error', { closeButton: true });
    }
    return docSnap.data();
  }

  async deleteSnippet(id: string) {
    const docRef = doc(this.db, 'snippets', id);
    await deleteDoc(docRef);
    this.toastr.warning('Snippet Deleted Successfully', 'Success', {
      closeButton: true,
    });
  }
}
