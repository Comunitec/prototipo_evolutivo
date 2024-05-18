import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingPageComponent } from './ranking-page.component';

describe('RankingPageComponent', () => {
  let component: RankingPageComponent;
  let fixture: ComponentFixture<RankingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RankingPageComponent]
    });
    fixture = TestBed.createComponent(RankingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
