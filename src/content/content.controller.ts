import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ContentService } from './services/content.service';
import {
  CreatePageDto,
  UpdatePageDto,
  CreateBlogPostDto,
  UpdateBlogPostDto,
  CreateCategoryDto,
  CreateHealthResourceDto,
  UpdateHealthResourceDto,
  PageQueryDto,
  BlogPostQueryDto,
  HealthResourceQueryDto,
} from './dto/content.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('content')
@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post('pages')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new page (admin)' })
  createPage(@Body() dto: CreatePageDto) {
    return this.contentService.createPage(dto, 'system');
  }

  @Patch('pages/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a page (admin)' })
  updatePage(@Param('id') id: string, @Body() dto: UpdatePageDto) {
    return this.contentService.updatePage(id, dto);
  }

  @Delete('pages/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a page (admin)' })
  deletePage(@Param('id') id: string) {
    return this.contentService.deletePage(id);
  }

  @Get('pages')
  @Public()
  @ApiOperation({ summary: 'List all pages' })
  findPages(@Query() query: PageQueryDto) {
    return this.contentService.findPages(query);
  }

  @Get('pages/:slug')
  @Public()
  @ApiOperation({ summary: 'Get page by slug' })
  findPageBySlug(@Param('slug') slug: string) {
    return this.contentService.findPageBySlug(slug);
  }

  @Get('pages/:id/versions')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get page version info' })
  getPageVersions(@Param('id') id: string) {
    return this.contentService.getPageVersions(id);
  }

  @Post('categories')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new category (admin)' })
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.contentService.createCategory(dto);
  }

  @Get('categories')
  @Public()
  @ApiOperation({ summary: 'List all categories' })
  findCategories() {
    return this.contentService.findCategories();
  }

  @Delete('categories/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a category (admin)' })
  deleteCategory(@Param('id') id: string) {
    return this.contentService.deleteCategory(id);
  }

  @Post('blog-posts')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new blog post (admin/editor)' })
  createBlogPost(@Body() dto: CreateBlogPostDto) {
    return this.contentService.createBlogPost(dto, 'system');
  }

  @Patch('blog-posts/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a blog post (admin/editor)' })
  updateBlogPost(@Param('id') id: string, @Body() dto: UpdateBlogPostDto) {
    return this.contentService.updateBlogPost(id, dto);
  }

  @Delete('blog-posts/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a blog post (admin)' })
  deleteBlogPost(@Param('id') id: string) {
    return this.contentService.deleteBlogPost(id);
  }

  @Get('blog-posts')
  @Public()
  @ApiOperation({ summary: 'List all blog posts' })
  findBlogPosts(@Query() query: BlogPostQueryDto) {
    return this.contentService.findBlogPosts(query);
  }

  @Get('blog-posts/:slug')
  @Public()
  @ApiOperation({ summary: 'Get blog post by slug' })
  findBlogPostBySlug(@Param('slug') slug: string) {
    return this.contentService.findBlogPostBySlug(slug);
  }

  @Post('health-resources')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a health resource (admin/editor)' })
  createHealthResource(@Body() dto: CreateHealthResourceDto) {
    return this.contentService.createHealthResource(dto, 'system');
  }

  @Patch('health-resources/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a health resource (admin/editor)' })
  updateHealthResource(@Param('id') id: string, @Body() dto: UpdateHealthResourceDto) {
    return this.contentService.updateHealthResource(id, dto);
  }

  @Delete('health-resources/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a health resource (admin)' })
  deleteHealthResource(@Param('id') id: string) {
    return this.contentService.deleteHealthResource(id);
  }

  @Get('health-resources')
  @Public()
  @ApiOperation({ summary: 'List all health resources' })
  findHealthResources(@Query() query: HealthResourceQueryDto) {
    return this.contentService.findHealthResources(query);
  }

  @Get('health-resources/:slug')
  @Public()
  @ApiOperation({ summary: 'Get health resource by slug' })
  findHealthResourceBySlug(@Param('slug') slug: string) {
    return this.contentService.findHealthResourceBySlug(slug);
  }
}
