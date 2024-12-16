import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Repository } from './repository';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class RepositoryUserService {
  getUserDetails: User;
  getRepositoryDetails: Repository[];

  constructor(private http: HttpClient) {
    this.getUserDetails = new User('', '', '', '', '', '', 0, 0, 0, new Date());
    this.getRepositoryDetails = [];
  }

  // Getting user details from API
  getUserResponse(githubUsername: string) {
    interface ApiUserResponse {
      name: string;
      login: string;
      avatar_url: string;
      html_url: string;
      location: string;
      bio: string;
      public_repos: number;
      followers: number;
      following: number;
      created_at: Date;
    }

    return new Promise<void>((resolve, reject) => {
      this.http
        .get<ApiUserResponse>(
          `${environment.apiUrl}/${githubUsername}?access_token=${environment.apiKey}`
        )
        .toPromise()
        .then(
          (response) => {
            if (response) {
              this.getUserDetails = response as User;
              resolve();
            } else {
              reject('User details API returned undefined response');
            }
          },
          (error) => {
            reject(error);
            console.error('Error fetching user details:', error);
          }
        );
    });
  }

  // Getting repository details
  getRepositoryResponse(githubUsername: string) {
    interface ApiRepositoryResponse {
      name: string;
      html_url: string;
      description: string;
      created_at: Date;
      language: string;
    }

    return new Promise<void>((resolve, reject) => {
      this.http
        .get<ApiRepositoryResponse[]>(
          `${environment.apiUrl}/${githubUsername}/repos?sort=created&direction=asc&access_token=${environment.apiKey}`
        )
        .toPromise()
        .then(
          (response) => {
            if (response) {
              // Map the API response to the Repository type
              this.getRepositoryDetails = response.map(repo => ({
                name: repo.name,
                html_url: repo.html_url,
                description: repo.description,
                created_at: repo.created_at,
                language: repo.language
              }));
              resolve();
            } else {
              reject('Repository details API returned undefined response');
            }
          },
          (error) => {
            reject(error);
            console.error('Error fetching repository details:', error);
          }
        );
    });
  }
}
