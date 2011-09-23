package FreeDOM::Test::Result::DataTest;

# Created by DBIx::Class::Schema::Loader
# DO NOT MODIFY THE FIRST PART OF THIS FILE

use strict;
use warnings;

use base 'DBIx::Class::Core';


=head1 NAME

FreeDOM::Test::Result::DataTest

=cut

__PACKAGE__->table("data_test");

=head1 ACCESSORS

=head2 id

  data_type: 'serial'
  is_nullable: 0

=head2 col1

  data_type: 'varchar'
  is_nullable: 0
  size: 30

=head2 col2

  data_type: 'integer'
  is_nullable: 0

=head2 col3

  data_type: 'varchar'
  is_nullable: 1
  size: 30

=head2 col4

  data_type: 'integer'
  is_nullable: 1

=head2 col5

  data_type: 'text'
  is_nullable: 1

=cut

__PACKAGE__->add_columns(
  "id",
  { data_type => "serial", is_nullable => 0 },
  "col1",
  { data_type => "varchar", is_nullable => 0, size => 30 },
  "col2",
  { data_type => "integer", is_nullable => 0 },
  "col3",
  { data_type => "varchar", is_nullable => 1, size => 30 },
  "col4",
  { data_type => "integer", is_nullable => 1 },
  "col5",
  { data_type => "text", is_nullable => 1 },
);
__PACKAGE__->set_primary_key("id");


# Created by DBIx::Class::Schema::Loader v0.07002 @ 2011-09-21 14:44:38
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:o2ZVtETyduqws706hcl4kA


# You can replace this text with custom content, and it will be preserved on regeneration
1;
