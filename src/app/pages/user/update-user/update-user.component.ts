import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent implements OnInit {
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
  async toastUpdate() {
    this.toast = await this.toastController.create({
      message: 'the user update !!! ',
      duration: 2000,
      animated: false,
      position: 'top',
      color: 'secondary',
    });
    this.toast.present();
  }

  updateUser() {
    this.UserService.updateUser(this.user).subscribe((res) => {
      this.toastUpdate();
      this.modelControl.dismiss();
    });
  }
}
