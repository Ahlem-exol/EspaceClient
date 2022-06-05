export class User {
  constructor(
    id: number,
    raison_social: string,
    nif?: string,
    nis?: string,
    registre?: string,
    rib?: string,
    active?: number,
    nom_contact?: string,
    prenom_contact?: string,
    adresse?: string,
    pays?: string,
    site_web?: string,
    telephone?: string,
    ville?: string,
    ai?: string,
    code_postal?: string,
    email?: string,
    etat?: number,
    fax?: string
    // fk_id_categorie: 0,
    // fk_media_id: 1,
  ) {}
}
