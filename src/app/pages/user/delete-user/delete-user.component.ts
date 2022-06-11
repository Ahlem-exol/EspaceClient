import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
})
export class DeleteUserComponent implements OnInit {
  @Input() user: User;
  toast: any;

  constructor(
    private modelControl: ModalController,
    private authService: AuthService,
    private toastController: ToastController,
    private UserService: UsersService
  ) {}

  ngOnInit() {}

  _dismiss() {
    this.modelControl.dismiss();
  }

  async toastDelete() {
    this.toast = await this.toastController.create({
      message: 'the user deleted',
      duration: 2000,
      animated: false,
      position: 'top',
      color: 'secondary',
    });
    this.toast.present();
  }

  deletUser() {
    console.log(this.user);
    this.UserService.DeleteUser(this.user.id).subscribe((res) => {
      this.toastDelete();
      this.modelControl.dismiss();
    });
  }
}
