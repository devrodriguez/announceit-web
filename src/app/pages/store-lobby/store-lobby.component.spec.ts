import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreLobbyComponent } from './store-lobby.component';

describe('StoreLobbyComponent', () => {
  let component: StoreLobbyComponent;
  let fixture: ComponentFixture<StoreLobbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreLobbyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
