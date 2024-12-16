import { Component, OnInit } from '@angular/core';
import { RepositoryUserService } from '../repository-user.service';
import { User } from '../user';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {
  user!: User;
  repositories: any;
  repositoriesVisible = false;
  paginationPages: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // Example pagination pages
  currentPage = 2; // Example current page

  constructor(private repositoryUserService: RepositoryUserService) {}

  ngOnInit(): void {
    this.getUserDetails('1Jothi');
    this.getUserRepositories('1Jothi');
  }

  toggleRepositories() {
    this.repositoriesVisible = !this.repositoriesVisible;
  }

  getUserDetails(githubUsername: string) {
    this.repositoryUserService.getUserResponse(githubUsername).then(
      (response) => {
        this.user = this.repositoryUserService.getUserDetails;
      },
      (error) => {
        console.log(error);
      }
    ); 
  }

  getUserRepositories(githubUsername: string) {
    this.repositoryUserService.getRepositoryResponse(githubUsername).then(
      (response) => {
        this.repositories = this.repositoryUserService.getRepositoryDetails;
        console.log(this.repositories);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
