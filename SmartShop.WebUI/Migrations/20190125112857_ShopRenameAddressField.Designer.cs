﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using SmartShop.Domain.Concrete;

namespace SmartShop.WebUI.Migrations
{
    [DbContext(typeof(EFDbContext))]
    [Migration("20190125112857_ShopRenameAddressField")]
    partial class ShopRenameAddressField
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.2.0-rtm-35687")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("SmartShop.Domain.Entities.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Categories");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Продукты"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Медикаменты"
                        });
                });

            modelBuilder.Entity("SmartShop.Domain.Entities.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("CategoryId");

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("Products");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CategoryId = 1,
                            Name = "Хлеб"
                        },
                        new
                        {
                            Id = 2,
                            CategoryId = 1,
                            Name = "Молоко"
                        },
                        new
                        {
                            Id = 3,
                            Name = "Fruits"
                        });
                });

            modelBuilder.Entity("SmartShop.Domain.Entities.Shop", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address");

                    b.Property<double?>("Lat");

                    b.Property<double?>("Lng");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Shops");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Address = "ул. Парковая",
                            Name = "АТБ"
                        },
                        new
                        {
                            Id = 2,
                            Address = "ул. Дворцовая",
                            Name = "АТБ"
                        },
                        new
                        {
                            Id = 3,
                            Address = "ул. Дворцовая",
                            Name = "Prostor"
                        },
                        new
                        {
                            Id = 4,
                            Address = "Mira ave.",
                            Name = "Квартал"
                        });
                });

            modelBuilder.Entity("SmartShop.Domain.Entities.ShopProduct", b =>
                {
                    b.Property<int>("ShopId");

                    b.Property<int>("ProductId");

                    b.HasKey("ShopId", "ProductId");

                    b.HasIndex("ProductId");

                    b.ToTable("ShopProduct");
                });

            modelBuilder.Entity("SmartShop.Domain.Entities.Product", b =>
                {
                    b.HasOne("SmartShop.Domain.Entities.Category", "Category")
                        .WithMany("Products")
                        .HasForeignKey("CategoryId");
                });

            modelBuilder.Entity("SmartShop.Domain.Entities.ShopProduct", b =>
                {
                    b.HasOne("SmartShop.Domain.Entities.Product", "Product")
                        .WithMany("ShopProducts")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("SmartShop.Domain.Entities.Shop", "Shop")
                        .WithMany("ShopProducts")
                        .HasForeignKey("ShopId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
