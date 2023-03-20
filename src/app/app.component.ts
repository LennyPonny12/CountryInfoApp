import { CommonModule } from '@angular/common';
import {
  ViewChild,
  ElementRef,
  OnInit,
  Component,
  Renderer2,
  ChangeDetectorRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppService } from './app.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('welcomeText') welcomeText: ElementRef;
  welcomeTextBool: boolean = true;
  lastStage: boolean = false;
  error: boolean = false;
  countryName: string = '';
  imgUrl: string = '';
  capital: string = '';
  lang: unknown[] = [];
  population: number = 0;

  constructor(
    private rendere: Renderer2,
    private changRef: ChangeDetectorRef,
    private service: AppService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      if (this.welcomeText.nativeElement) {
        this.rendere.addClass(this.welcomeText.nativeElement, 'show');
      }
    }, 1500);
  }

  welcomDis() {
    this.welcomeTextBool = false;
    this.changRef.detectChanges();
  }

  searchForCountry() {
    this.service.getCountry(this.countryName).subscribe(
      (data) => {
        this.lastStage = true;
        this.error = false;
        let country = data[0];
        this.countryName = country.name.common;
        this.imgUrl = country.flags.png;
        this.capital = country.capital[0];
        this.lang = [...Object.values(country.languages)];
        this.population = country.population;
      },
      (error) => {
        this.error = true;
      }
    );
  }

  resetApp() {
    this.countryName = '';
    this.lastStage = false;
    this.error = false;
  }
}
