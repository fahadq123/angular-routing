import {Component, OnInit} from '@angular/core';

import {ServersService} from '../servers.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CanDeactivateGuardService} from './can-activate-guard.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanDeactivateGuardService {
  server: { id: number, name: string, status: string };
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {

    // Alternatively

    // console.log(this.route.queryParams.subscribe((params: Params) => {
    //   console.log(params['allowEdit']);
    //   console.log(params['testsQuery']);
    // }));

    // console.log(this.route.fragment.subscribe((fragment) => {
    //   console.log(fragment);
    // }));
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
    });
    this.route.params.subscribe((params: Params) => {
      this.server = this.serversService.getServer(+params['id']);
      this.serverStatus = this.server.status;
      this.serverName = this.server.name;
    });
    this.server = this.serversService.getServer(+this.route.snapshot.params['id']);

  }


  onUpdateServer() {
    // tslint:disable-next-line:max-line-length
    this.serversService.updateServer(this.server.id, {name: this.server.name, status: this.server.status});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
    if (this.serverName !== this.server.name || this.serverStatus !== this.server.status) {
      return confirm('Do you want to discard the changes? ');
    } else {
      return true;
    }

  }
}
